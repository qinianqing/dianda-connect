import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';
import * as passport from 'passport';
import * as ensureLogin from 'connect-ensure-login';
import { models } from '../db2';
import { UserAttributes } from '../db/user/user-interface'
import { md5Encryptor } from '../util/encryption'


export default class IndexRoute extends BaseRoute {
    public static AddRouter(router: Router) {
        router.get('/', ensureLogin.ensureLoggedIn(), (req, res) => {
            res.redirect('landing-page.html');
        });

        router.get('/login', (req, res) => {
            res.redirect('login-page.html');
        });

        router.post('/login', passport.authenticate('local'), (req, res) => {
            res.end();
        });

        router.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        })

        router.get('/user', (req, res) => {
            let user: UserAttributes = req.user;
            if (user) {
                return res.json(user);
            } else {
                return res.status(401).end();
            }
        })
        // router.get('/register', ensureLogin.ensureLoggedIn(), (req, res) => {
        //     res.redirect('register-page.html');
        // });
        router.post('/register', async (req, res) => {
            if (!req.user.privilege.includes('admin')) {
                return res.status(402).json({ info: '您没有权限注册' });
            };
            type form = { username: string, password: string, privilege: string | string[] };

            let { username, password, privilege }: form = req.body;
            //验证username,password,privilege

            if (typeof privilege !== 'string') {
                privilege = privilege.join(',');
            }

            try {
                await models.User.create({
                    name: username,
                    password: md5Encryptor.encode(password, username),
                    privilege: privilege
                });

                console.log(privilege);
                res.end();

            } catch (error) {
                res.status(402).json({ info: '注册失败' });
            }
        });

        router.post('/modify', async (req, res) => {
            // console.log(req.body)
            type form = {
                nickname: string, email: string, telephone: string,
                oldPassword: string, newPassword: string
            };
            let {
                nickname, email, telephone,
                oldPassword, newPassword
            }: form = req.body;

            if (req.user) {
                let user: UserAttributes = req.user;
                let update: UserAttributes = {} as UserAttributes;
                if (nickname) { update.nickname = nickname }
                if (email) { update.email = email }
                if (telephone) { update.telephone = telephone }
                if (newPassword) { update.password = md5Encryptor.encode(newPassword, user.name) }
                update.privilege = user.privilege;

                //验证密码
                if (md5Encryptor.isMatch(oldPassword, user.password, user.name)) {
                    try {
                        //修改用户密码
                        await models.User.update(update, { where: { name: user.name } });
                        return res.end();
                    } catch (error) {
                        console.log(error);
                        return res.status(403).end('modify password failed');
                    }
                } else {
                    return res.status(400).end('wrong password');
                }
            } else {
                return res.status(401).end();
            }
        });


    }

    constructor() {
        super();
    }
}