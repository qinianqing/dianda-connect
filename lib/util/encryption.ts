import * as md5 from 'js-md5';
import * as nodeRsa from 'node-rsa';
import * as fs from 'fs';
import * as path from 'path';
import { base64 } from './base64'


//简单的加密存储密码工具
export interface Encryptor {
    encode(raw: string, salt?: string): string;
    isMatch(raw: string, password: string, salt?: string): boolean;
}


class Md5Encryptor implements Encryptor {

    encode(raw: string, salt: string = ''): string {
        return md5(raw + salt);
    }

    isMatch(raw: string, password: string, salt: string = ''): boolean {
        if (!raw || !password) {
            return false;
        }
        return this.encode(raw, salt) === password;
    }

}

export const md5Encryptor = new Md5Encryptor();

let priKey: string = '';
//读取并导入私钥
try {
    let _key = fs.readFileSync(path.join(__dirname, '../../brsa')).toString();
    priKey = base64.decode(_key);
} catch (error) {
    console.log(error);
}
const key = new nodeRsa();
key.importKey(priKey, 'private');


export const rsaEncrypt = (toEncrypt: string): string => key.encryptPrivate(toEncrypt, 'base64');
// console.log(rsaEncrypt('hello'));
// console.log(priKey);

// let keyFile = fs.readFileSync(path.join(__dirname, '../../rsa.pri'));
// let brsa: string = base64.encode(keyFile.toString());

// fs.writeFileSync('brsa', brsa);