import { Module } from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import {UserModel} from '../user/user.model';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {getJwtConfig} from "../../configs/jwt.config";
import {UserCommands} from "../user/commands/user.commands";
import {UserQueries} from "../user/queries/user.queries";
import {UserRepository} from "../user/user.repository";
import {AuthCommands} from "./auth.commands";

@Module({
  controllers: [UserCommands, UserQueries, AuthCommands],
  imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User'
				}
			}
		]),
	  ConfigModule,
	  JwtModule.registerAsync({
		  imports: [ConfigModule],
		  inject: [ConfigService],
		  useFactory: getJwtConfig
	  })
  ],
  providers: [AuthService, UserRepository]
})
export class AuthModule {}
