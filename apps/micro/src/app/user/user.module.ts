import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./models/user.model";
import UserRepository from "./repositories/user.repository";

@Module({
  providers: [UserRepository],
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema }
  ])]
})
export class UserModule {}
