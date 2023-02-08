import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { RMQModule } from "nestjs-rmq";
import { getJwtConfig } from "../configs/configs/jwt.config";
import { getRMQConfig } from "../configs/configs/rmq.config";
import { AuthController } from "../controllers/auth.controller";
import {UserController} from "../controllers/user.controller";


@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true}),
        RMQModule.forRootAsync(getRMQConfig()),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig
        }),
        PassportModule
    ],
    controllers: [AuthController, UserController]
})


export class AppModule {}
