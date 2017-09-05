import { Hr } from '../mongose/user-schema';
import { UserAttributes } from '../db/user/user-interface';
import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';
import { log } from '../config/log-config';
const validator = require('validator');

export default class AuthRoute extends BaseRoute {
    public static AddRouter(router: Router) {
        router.get('/hr', (req, res) => {
            // 初始化显示
            Hr.find({}, function (err, users) {
                if (!err) {
                    let dataSet = { "data": users };
                    res.send(dataSet);
                    log.info(req.user+"get candidates information")
                } else {
                    log.info(err)
                }
            });
        });
        // 添加候选者
        router.post('/hr', (req, res) => {
            let user: UserAttributes = req.user;
            if (!user || !user.privilege.includes('hr')) { return res.end(401); }
            if (req.body.name == '' || req.body.phone == '') {
                log.warn('add unsuccessful, User name and password cannot be empty');
                
                return res.status(400).json({ info: '(用户名和电话不能为空)' });
            }
            if (!validator.isEmail(req.body.email)) {
                log.warn('add unsuccessful, Incorrect email format');
                return res.status(400).json({ info: "邮箱格式不正确" });
            }
            if (!validator.matches(req.body.phone, /^[0-9]{11}$/, 'g')) {
                log.warn('add unsuccessful, Incorrect phone format');
                return res.status(400).json({ info: "请正确填写电话号码" });
            }
            Hr.find({ name: req.body.name, phone: req.body.phone }, (err, users) => {
                // console.log(req.body)
                if (users.length == 0) {
                    try {
                        new Hr(req.body).save();
                        log.info("add candidate success");
                        res.status(200).json({ info: '(添加成功)' });
                    } catch (error) {
                        // console.log(error)
                        log.error(error);
                        res.status(400).json({ info: '(添加失败)' });
                    }
                } else {
                    res.status(400).json({ info: '(该用户已存在)' });
                }
            })
        });
        // 获取候选者信息
        router.get('/change/:name/:phone', (req, res) => {
            // console.log(req.params);
            Hr.findOne({ name: req.params.name, phone: req.params.phone }, (err, users) => {
                log.info("find" + users);
                try {
                    res.status(200).json(users);
                } catch (error) {
                    log.error(error);
                    res.status(500).json({ info: '(查找失败)' });

                }
            })
        });
        // 更改后选者信息
        router.post('/changes', (req, res) => {
            // console.log(req.body.statu);
            if (req.body.name == '' || req.body.phone == '') {
                log.info('[get one candidatr unsuccessful, User name and password cannot be empty]');
                return res.status(400).json({ info: '(用户名和电话不能为空)' });
            }
            if (!validator.isEmail(req.body.email)) {
                log.info('[get one candidatr unsuccessful, Incorrect email format]');
                return res.status(400).json({ info: "邮箱格式不正确" });
            }
            if (!validator.matches(req.body.phone, /^1[0-9]{10}$/, 'g')) {
                log.info('[get one candidatr unsuccessful, Incorrect phone format');
                return res.status(400).json({ info: '请正确填写电话号码' });
            }
            Hr.update({ name: req.body.name }, req.body, (err) => {
                log.info(req.body)
                if (err) {
                    log.error(err);
                    return res.status(400).json({ info: '请正确填写信息' });
                } else {
                    log.info('Update' + req.body + 'success')
                    res.status(200).json({ info: '(更新用户成功)' });
                }
            })

        });

    }

}