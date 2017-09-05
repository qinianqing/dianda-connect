export interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    logging: boolean | Function;
    force: boolean;
    timezone: string;
}

//development
export const localDatabaseConfig: DatabaseConfig = {
    username: "root",
    password: "root123",
    database: "dianda_connect",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    logging: true,
    force: true,
    timezone: "+00:00"
};

//test
export const testDatabaseConfig: DatabaseConfig = {
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
export const prodDatabaseConfig: DatabaseConfig = {
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