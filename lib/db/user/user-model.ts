import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { UserAttributes, UserInstance } from './user-interface';

export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<UserInstance, UserAttributes> {
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
        });
}
