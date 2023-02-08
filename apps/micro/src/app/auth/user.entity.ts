import {Injectable} from "@nestjs/common";
import {IUser, IUserCourses, UserRole} from "@micro/interfaces";
import {UserChangeProfileCommand} from "@micro/contracts";

@Injectable()
export class UserEntity implements IUser {
  _id: string;
  courses: IUserCourses[];
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  constructor(user: IUser) {
    this._id          = user._id
    this.courses      = user.courses
    this.displayName  = user.displayName
    this.email        = user.email
    this.passwordHash = user.passwordHash
    this.role         = user.role
  }

  updateProfile(displayName: string, role: UserRole): IUser {
    this.displayName = displayName
    this.role        = role
    return this;
  }
}
