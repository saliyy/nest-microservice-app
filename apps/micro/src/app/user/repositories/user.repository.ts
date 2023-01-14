import {InjectModel} from "@nestjs/mongoose";
import {User} from "../models/user.model";
import {Model} from "mongoose";
import {UserEntity} from "../entities/user.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(user: UserEntity) {
    return await this.userModel.create(user)
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).exec();
  }


  async deleteByEmail(email: string) {
    return await this.userModel.deleteOne({ email: email }).exec()
  }
}
