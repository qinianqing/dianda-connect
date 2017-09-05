import * as path from 'path';
import * as log4js from 'log4js';
import * as morgan from 'morgan';
import { IConfig, AppenderConfig } from 'log4js';

const appenders: AppenderConfig[] = [
    {
        type: 'console'
    },
    // {
    //     type: 'dateFile',
    //     filename: path.join(__dirname, '../../logs/'),
    //     pattern: 'yyyy-MM-dd.log',
    //     alwaysIncludePattern: true,
    //     maxLogSize: 10485760,
    //     level: 'INFO',
    //     category: 'sql'
    // }
];

const config: IConfig = {
    replaceConsole: true,
    appenders
}

log4js.configure(config);

const sqlLog = log4js.getLogger('sql');         //sql日志
const log = log4js.getLogger('app');            //普通日志

const httpLog = log4js.getLogger('express');    //express日志
const morganLog = morgan('combined', { stream: { write: (s: string) => httpLog.debug(s) } });

export { sqlLog, morganLog, log, log4js };