import {IsString} from "class-validator";
import {IUser} from "@micro/interfaces";

export namespace UserGetInfoQuery {
  export const topic = 'user.get-info.queries'

  export class Request {
    @IsString()
    id: string
  }

  export class Response {
    user: Omit<IUser, 'passwordHash'>
  }
}
