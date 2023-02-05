import {IsString} from "class-validator";

export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    @IsString()
    login: string;
    @IsString()
    password: string;
  }

  export class Response {
    @IsString()
    access_token: string;
  }
}
