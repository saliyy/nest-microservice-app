import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getMongoConfig} from "../../configs/mongo.config";
import {TypegooseModule} from "nestjs-typegoose";
import {RMQModule} from "nestjs-rmq";
import {getRMQConfig} from "../../configs/rmq.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.account.env'
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
