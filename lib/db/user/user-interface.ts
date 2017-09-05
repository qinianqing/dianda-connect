import { Instance } from 'sequelize';

export interface UserAttributes {
    name: string;
    password: string;
    nickname?: string;
    email?: string;
    phone?: string;
    telephone?: string;
    avatar?: string;
    status?: number;
    privilege:string;
}

export interface UserInstance extends Instance<UserAttributes> {
    dataValues: UserAttributes;
}
