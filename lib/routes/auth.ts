import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';
import { models } from '../db2';
import { UserAttributes } from '../db/user/user-interface';
import { base64 } from '../util/base64';
import { rsaEncrypt } from '../util/encryption'
import * as moment from 'moment';

export interface AuthInfo {

    authapi: string;    //验证用户的api
    goto: string;   //验证完跳转的页面
}


export default class AuthRoute extends BaseRoute {

    constructor() {
        super();
    }

    public static AddRouter(router: Router) {

        router.get('/auth', (req, res) => {
            if (!req.user) { return res.status(401).end(); }
            let authInfo: AuthInfo = req.query;
            //用户名，时间戳
            let toEncrypt = `${req.user.name},${Math.round(new Date().getTime() / 1000)}`;
            let uri: string = `${authInfo.authapi}?token=${rsaEncrypt(toEncrypt)}&goto=${authInfo.goto}`;
            return res.redirect(uri);
        });
    }

}