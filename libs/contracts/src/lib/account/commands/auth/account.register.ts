import {IsOptional, IsString} from "class-validator";

export namespace AccountRegister {
  export const topic = 'account.register.command'


  export class Request {
    @IsString()
    login: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    displayName?:string
  }


  export class Response {
    @IsString()
    email: string;
  }
}
