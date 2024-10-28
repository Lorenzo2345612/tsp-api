import { Module } from '@nestjs/common';
import { AppController } from '/app/src/app.controller';
import { AppService } from '/app/src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConstants } from '/app/src/constants/db.constants';
import { User } from '/app/src/user/entities/user.entity';
import { News } from '/app/src/news/entities/news.entity';
import { RiskAreasModule } from '/app/src/risk-zones/risk-areas.module';
import { NotificationModule } from '/app/src/notification/notification.module';
import { CheckpointModule } from '/app/src/checkpoint/checkpoint.module';
import { Checkpoint } from '/app/src/checkpoint/entities/checkpoint.entity';
import { UserModule } from '/app/src/user/user.module';
import { NewsModule } from '/app/src/news/news.module';

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
