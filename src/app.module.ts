console.info(__dirname);

import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConstants } from 'src/constants/db.constants';
import { User } from 'src/user/entities/user.entity';
import { News } from 'src/news/entities/news.entity';
import { RiskAreasModule } from 'src/risk-zones/risk-areas.module';
import { NotificationModule } from 'src/notification/notification.module';
import { CheckpointModule } from 'src/checkpoint/checkpoint.module';
import { Checkpoint } from 'src/checkpoint/entities/checkpoint.entity';
import { UserModule } from 'src/user/user.module';
import { NewsModule } from 'src/news/news.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DbConstants.DB_HOST,
      port: DbConstants.DB_PORT,
      username: DbConstants.DB_USER,
      password: DbConstants.DB_PASSWORD,
      database: DbConstants.DB_NAME,
      entities: [User, News, Checkpoint],
      synchronize: true,
      logging: false,
    }),
    RiskAreasModule,
    NotificationModule,
    CheckpointModule,
    UserModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
