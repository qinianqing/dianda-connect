CREATE DATABASE IF NOT EXISTS dianda_connect default charset utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS user(
    id INT AUTO_INCREMENT primary key,      -- 用户id
    name VARCHAR(255)  NOT NULL unique,     -- 用户名
    password VARCHAR(255) NOT NULL,         -- 密码
    nickname VARCHAR(255) DEFAULT NULL,     -- 昵称
    email VARCHAR(255) DEFAULT NULL,        -- 邮箱
    phone VARCHAR(255) DEFAULT NULL,        -- 联系电话
    telephone VARCHAR(255) DEFAULT NULL,    -- 座机电话
    avatar VARCHAR(255) DEFAULT NULL,       -- 头像
    privilege TEXT,                         -- 权限
    status INT NOT NULL DEFAULT 0,          -- 账号状态
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) AUTO_INCREMENT=1000;
