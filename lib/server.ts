import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as express from 'express';
// import * as logger from 'morgan';
import * as path from 'path';
import * as cors from 'cors';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import * as http from 'http';

import { morganLog } from './config/log-config'
import IndexRoute from './routes/index';
import AuthRoute from './routes/auth';
import HrRoute from './routes/hr';
import { models } from './db2';
import { UserAttributes, UserInstance } from './db/user/user-interface'
import { md5Encryptor } from './util/encryption';

passport.use(new Strategy(async (username, passwd, done) => {
    let user: UserInstance;
    try {
        user = await models.User.findOne({ where: { name: username } });
        if (user && md5Encryptor.isMatch(passwd, user.dataValues.password, username)) {
            return done(null, user.dataValues);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.log(error);
        return done(error, false);
    }
}));

passport.serializeUser((user: UserAttributes, done) => {
    done(null, user.name);
});

passport.deserializeUser(async (username: string, done) => {
    let user: UserInstance;
    try {
        user = await models.User.findOne({ where: { name: username } });
        return done(null, user ? user.dataValues : false);
    } catch (error) {
        return done(error, false);
    }
});

export default class Server {

    public app: express.Application;
    public bootstrap(port: number = 3000): Server {
        http.createServer(this.app).listen(port);
        return this;
    }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.api();
        this.handleError();
    }
    public api() {
    }
    public config() {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(morganLog);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'DIANDA2017'
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    public routes() {
        const router: express.Router = express.Router();
        IndexRoute.AddRouter(router);
        AuthRoute.AddRouter(router);
        HrRoute.AddRouter(router);
        this.app.use(router);
    }

    public handleError() {
        this.app.use((req, res) => res.redirect('404-page.html'));
    }
}
