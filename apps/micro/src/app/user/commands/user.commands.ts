import {RMQRoute, RMQValidate} from "nestjs-rmq";
import {UserUpdateProfileCommand} from "@micro/contracts";
import {BadRequestException, Body, Controller} from "@nestjs/common";
import {UserRepository} from "../user.repository";
import {UserEntity} from "../user.entity";

@Controller()
export class UserCommands {
  constructor(
    private readonly userRepository: UserRepository
  ) {}
  @RMQRoute(UserUpdateProfileCommand.topic)
  @RMQValidate()
  async updateProfile(@Body() dto: UserUpdateProfileCommand.Request): Promise<UserUpdateProfileCommand.Response> {
    const userToUpdate = await this.userRepository.findUserById(dto.id);

    if (!userToUpdate) {
      throw new BadRequestException('user to update not found');
    }

    const updatedProfile = new UserEntity(userToUpdate).updateProfile(dto.displayName, dto.role)

    await this.userRepository.updateUser(updatedProfile)

    return {
      user: updatedProfile
    }
  }
}
