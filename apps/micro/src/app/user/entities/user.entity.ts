import IUser, {UserRole} from "../../../../../../libs/interfaces/user.interface";
import {compare, genSalt, getSalt, hash} from "bcryptjs";

export class UserEntity implements IUser {
  _id?: number;
  displayName?: string
  email: string;
  passwordHash: string;
  role: UserRole

  constructor(user: IUser) {
    Object.assign(this, user)
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10)
    this.passwordHash = await hash(password, salt)
    return this;
  }

  public async validatePassword(password: string) {
    return await compare(password, this.passwordHash)
  }
}
