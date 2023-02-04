import {Body, Controller, Post, UnauthorizedException, UsePipes, ValidationPipe} from "@nestjs/common";
import {AccountLogin, AccountRegister} from '@micro/contracts';
import {RMQService} from "nestjs-rmq";

@Controller('auth')
export class AuthController {
    constructor(private rmqService: RMQService) {}

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AccountRegister.Request) {
      try {
        return await this.rmqService.send<AccountRegister.Request, AccountRegister.Response>(AccountRegister.topic, dto)
      } catch (e) {
        if (e instanceof Error) {
          throw new UnauthorizedException(e.message)
        }
      }
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body() dto: AccountLogin.Request) {
        try {
          return await this.rmqService.send<AccountLogin.Request, AccountLogin.Response>(AccountLogin.topic, dto)
        } catch (e) {
          if (e instanceof Error) {
            throw new UnauthorizedException(e.message)
          }
        }
    }
}
