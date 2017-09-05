import { DatabaseConfig, localDatabaseConfig, testDatabaseConfig, prodDatabaseConfig } from './database-config';

const env = process.env.NODE_ENV;

class Config {

    private testDatabaseConfig: DatabaseConfig;     //test
    private prodDatabaseConfig: DatabaseConfig;     //production

    private localDatabaseConfig: DatabaseConfig;    //development

    constructor() {
        this.testDatabaseConfig = testDatabaseConfig;
        this.prodDatabaseConfig = prodDatabaseConfig;

        this.localDatabaseConfig = localDatabaseConfig;
    }

    getDatabaseConfig(): DatabaseConfig {
        switch (env) {
            case 'test':
                return this.testDatabaseConfig;
            case 'production':
                return this.prodDatabaseConfig;
            default:
                return this.localDatabaseConfig;
        }
    }
}

export const config = new Config();
