import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from './entites/user.entity';
import { TaskEntity } from './entites/task.entity';

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
    entities: [UserEntity,TaskEntity ],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
};

export default new DataSource(dataSourceOptions);
