import * as SequelizeStatic from 'sequelize'
import { DataTypes, Sequelize, Instance } from 'sequelize'

export interface UserAttributes {
    name: string
    password: string
    nickname?: string
    email?: string
    phone?: string
    telephone?: string
    avatar?: string
    status?: number
    privilege: string
}

export interface UserInstance extends Instance<UserAttributes> {
    dataValues: UserAttributes
}

export function userDefine(sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<UserInstance, UserAttributes> {
    return sequelize.define<UserInstance, UserAttributes>('User', {
        name: { type: dataTypes.STRING },
        password: { type: dataTypes.STRING },
        nickname: { type: dataTypes.STRING },
        email: { type: dataTypes.STRING },
        phone: { type: dataTypes.STRING },
        telephone: { type: dataTypes.STRING },
        avatar: { type: dataTypes.STRING },
        status: { type: dataTypes.DECIMAL },
        privilege: { type: dataTypes.TEXT }
    }, {
            indexes: [],
            freezeTableName: true,
            classMethods: {},
            tableName: 'user',
            timestamps: false
        })
}
