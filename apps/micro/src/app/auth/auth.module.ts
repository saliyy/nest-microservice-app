import { Module } from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose';
import {UserModel} from './user.model';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './strategies/jwt.strategy';
import {getJwtConfig} from "../../../configs/jwt.config";
import {UserCommands} from "./user.commands";
import {UserQueries} from "./user.queries";

@Module({
  controllers: [UserCommands, UserQueries],
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
	  }),
	  PassportModule
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
