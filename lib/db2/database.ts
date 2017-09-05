import * as SequelizeStatic from 'sequelize'
import { Sequelize } from 'sequelize'
import { ModelDefine } from './model'


export interface SequelizeModels {
    [index: string]: SequelizeStatic.Model<any, any>
}

export interface DbConfig {
    username: string
    password: string
    database: string
    host: string
    port: number
    dialect: string
    logging: boolean | Function
    force: boolean
    timezone: string
}

export class Database {
    sequelize: Sequelize
    models: SequelizeModels = {} as SequelizeModels

    constructor(dbConfig: DbConfig, modelDefine: ModelDefine) {
        this.sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)
        Object.keys(modelDefine).forEach((k: string) => this.models[k] = modelDefine[k](this.sequelize, SequelizeStatic))
    }
}