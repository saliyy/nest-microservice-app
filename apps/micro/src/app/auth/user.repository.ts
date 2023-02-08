import {Injectable} from "@nestjs/common";
import {InjectModel} from "nestjs-typegoose";
import {UserModel} from "./user.model";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {IUser} from "@micro/interfaces";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
  ) {}

  async findUserById(id: string) {
    return this.userModel.findById(id).select(['-passwordHash']).exec();
  }

  async updateUser({ _id, ...rest }: IUser) {
    return this.userModel.updateOne({ _id }, { $set: { ...rest } }).exec();
  }

}
