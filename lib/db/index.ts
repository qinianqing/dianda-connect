/*
 * @Deprecated
 */

import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import { config } from '../config/config';
import { UserAttributes, UserInstance } from './user/user-interface';
import { Sequelize } from 'sequelize';
import { sqlLog } from '../config/log-config'

export interface SequelizeModels {
    [index: string]: SequelizeStatic.Model<any, any>;
    User: SequelizeStatic.Model<UserInstance, UserAttributes>;
}

class Database {
    private basename: string;
    private models: SequelizeModels;
    private sequelize: Sequelize;

    getModels() { return this.models; }

    getSequelize() { return this.sequelize; }

    constructor() {
        this.basename = path.basename(module.filename);
        let dbConfig = config.getDatabaseConfig();
        if (dbConfig.logging) {
            dbConfig.logging = (sql: string) => sqlLog.info(sql);
        }
        this.sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

        this.models = {} as SequelizeModels;
        this.importModels();
    }

    importModels() {
        fs.readdirSync(__dirname).filter((first: string) => !/.DS_Store/.test(first) && !/^index/.test(first)).forEach((first: string) => {
            fs.readdirSync(path.join(__dirname, first)).filter((second: string) => /-model\..s$/.test(second)).forEach((second: string) => {
                let model = this.sequelize.import(path.join(__dirname, first, second));
                this.models[(model as any).name] = model;
            });
        });
    }

}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
