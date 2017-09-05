import { Model, DataTypes, Sequelize } from 'sequelize'
import * as SequelizeStatic from 'sequelize'

import { UserInstance, UserAttributes, userDefine } from './user'
import { SequelizeModels } from '../database'


type sequelizeDefine = (sequelize: Sequelize, dataTypes: DataTypes) => SequelizeStatic.Model<any, any>

export interface Models extends SequelizeModels {
    User: SequelizeStatic.Model<UserInstance, UserAttributes>
}

export interface ModelDefine {
    [index: string]: sequelizeDefine
}

export const modelDefine: ModelDefine = {
    User: userDefine,
}