import {IsString} from "class-validator";
import IUser from "../../../../../interfaces/src/lib/user/user.interface";

export namespace UserGetInfoQuery {
  export const topic = 'user.get-info.query'

  export class Request {
    @IsString()
    id: string
  }

  export class Response {
    user: Omit<IUser, 'passwordHash'>
  }
}
