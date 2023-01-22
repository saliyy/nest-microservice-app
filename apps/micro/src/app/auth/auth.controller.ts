import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AccountLogin, AccountRegister} from '@micro/contracts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
    const userSuchEmailExists = await this.authService.findUser(dto.login);

    if (userSuchEmailExists) {
      throw new BadRequestException('user such email already exists!');
    }

    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { email } = await this.authService.validateUser(
      dto.login,
      dto.password
    );

    return this.authService.login(email);
  }
}
