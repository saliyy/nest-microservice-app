import { Body, Controller } from "@nestjs/common";
import {AccountLogin, AccountRegister} from '@micro/contracts';

@Controller('auth')
export class AuthController {
    async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {

    }


    async login(@Body() dto: AccountLogin.Request): Promise<AccountLogin.Response> {
        
    }
}