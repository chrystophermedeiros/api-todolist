import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

// Verifique se DB_NAME está definido
const dbName = configService.get<string>('DB_NAME');
if (!dbName) {
    throw new Error('DB_NAME não definida na variável de ambiente');
}

const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: dbName,
    entities: [ ],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
};

export default new DataSource(dataSourceOptions);
