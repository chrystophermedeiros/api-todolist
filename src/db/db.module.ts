import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ TypeOrmModule.forRootAsync({
        useFactory: async (configService: ConfigService) => ({
            type: 'sqlite',
            database: configService.get<string>('DB_NAME'),
            entities: [__dirname + '/../**/*.entity.{ts}'],
            migrations: [__dirname + '/../migrations/*.{ts}'],
            synchronize: false
        }),
        inject: [ConfigService],
        
    })
        
    ]
})
export class DbModule {}
