import { AuthService } from './auth.service';
import {AccountLogin, AccountRegister} from '@micro/contracts';
import {RMQRoute, RMQValidate} from "nestjs-rmq";
import {BadRequestException, Body, Controller} from "@nestjs/common";

@Controller()
export class AuthCommands {
  constructor(private readonly authService: AuthService) {}

  @RMQRoute(AccountRegister.topic)
  @RMQValidate()
  async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
    const userSuchEmailExists = await this.authService.findUser(dto.login);

    if (userSuchEmailExists) {
      throw new BadRequestException('user such email already exists!');
    }

    return this.authService.createUser(dto);
  }

  @RMQRoute(AccountLogin.topic)
  @RMQValidate()
  async login(@Body() dto: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { email, id } = await this.authService.validateUser(
      dto.login,
      dto.password
    );

    return this.authService.login(email, id);
  }
}
