import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entites/user.entity';
import { TaskEntity } from './entites/task.entity';

@Module({
    imports: [ TypeOrmModule.forRootAsync({
        useFactory: async (configService: ConfigService) => ({
            type: 'sqlite',
            database: configService.get<string>('DB_NAME'),
            entities: [UserEntity,TaskEntity],
            migrations: [__dirname + '/../migrations/*.{ts}'],
            synchronize: false
        }),
        inject: [ConfigService],
        
    })
        
    ]
})
export class DbModule {}
