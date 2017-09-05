import * as SequelizeStatic from 'sequelize'
import { Sequelize } from 'sequelize'

import { modelDefine, Models } from './model'
import { Database, DbConfig } from './database'

const env = process.env.NODE_ENV;

//development
export const localDb: DbConfig = {
    username: "root",
    password: "root123",
    database: "dianda_connect",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    logging: true,
    force: true,
    timezone: "+00:00",
}
//test
export const testDatabaseConfig: DbConfig = {
    username: "root",
    password: "d0UJK93XoBBi",
    database: "dianda_connect",
    host: "192.168.67.61",
    port: 3306,
    dialect: "mysql",
    logging: true,
    force: true,
    timezone: "+00:00"
}
//production
export const prodDatabaseConfig: DbConfig = {
    username: "root",
    password: "IThm6iv7oq1q",
    database: "dianda_connect",
    host: "192.168.47.219",
    port: 3306,
    dialect: "mysql",
    logging: true,
    force: true,
    timezone: "+00:00"
}

const dbConfig: DbConfig = (env => {
    switch (env) {
        case 'test': return testDatabaseConfig;
        case 'production': return prodDatabaseConfig;
        default: return localDb;
    }
})(env);

//日志打印
dbConfig.logging = (sql: string) => console.log(sql)

const db = new Database(dbConfig, modelDefine)
export const sequelize = db.sequelize
export const models: Models = db.models as Models