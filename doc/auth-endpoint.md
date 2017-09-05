## 登陆接口说明

Dianda Connect 提供以下接口用于其他系统获取授权的登陆信息

```Uri
diandabrain.com/auth?authapi=http://www.example.com/foo&goto=http://www.example.com/bar
```

当跳转到第三方系统时，dianda-connect会让浏览器重定向到类似如下的地址

```uri
http://www.example.com/foo?token=qKMHd4Ml6Vr8WwEQo1TR/Nd1xMsROCfQRDiwFoSVRCPbt7mGryp4BWW3Cl3+CB4Hkwzpiq1OtEPojJn7tTbdlkXcdNGTUSpT2etyY5mg0dvx3zJjBExhlR0UwxnxROSOo0jYwJr07Ln1miPV1gIi0GTakSguaujGBzYpf5xWS9g=&goto=http://www.example.com/bar
```

因此，第三方系统需要提供一个登陆的api（authapi），支持浏览器的get请求，并求能够接受以下两个参数

- token
- goto（可选）

其中token是一个加密的字符串，代表了私钥加密的用户名与当前的时间戳，比如

```
username,1500271950699
```

api需要使用公钥解开密文

```javascript
var decrypted = key.decryptPublic(encrypted, 'utf8'); 
//decrypted: username,1500271950699
```

dinada-connect将提供公钥，nodejs可以使用node-rsa库

## 登陆接口示例

```Javascript
const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const nodeRsa = require('node-rsa');

const app = express();
const pubKey = fs.readFileSync(path.join(__dirname, 'rsa.pub')).toString();
const key = new nodeRsa();
//导入公钥
key.importKey(pubKey, 'public');


app.get('/api/login', (req, res) => {
    let { token, goto } = req.query;
    if (token) {
        try {
            let decrypted = key.decryptPublic(token.split(' ').join('+'), 'utf8');
            let [username, time] = decrypted.split(',');
            //这里验证时间、登陆用户
            //req.logon(user)
            console.log(`login user:${username} at ${time}`);
            res.redirect(goto || '/');
        } catch (error) {
            console.log(error);
            res.status(400).end();
        }
    } else {
        res.status(401).end();
    }
});

http.createServer(app).listen(2000);
```