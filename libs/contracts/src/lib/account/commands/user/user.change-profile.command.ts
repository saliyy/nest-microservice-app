import {IsEnum, IsString} from "class-validator";
import {IUser, UserRole} from "@micro/interfaces";

export namespace UserUpdateProfileCommand {
  export const topic = 'user.update-profile.command';

  export class Request {
    @IsString()
    id: string;
    @IsString()
    displayName: string;

    @IsEnum(UserRole)
    role: UserRole
  }

  export class Response {
    user: IUser
  }
}
