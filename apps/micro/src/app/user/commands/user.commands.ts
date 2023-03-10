import {RMQRoute, RMQValidate} from "nestjs-rmq";
import {UserBuyCourseCommand, UserCheckPaymentQuery, UserUpdateProfileCommand} from "@micro/contracts";
import {Body, Controller} from "@nestjs/common";
import {UserService} from "../services/user.service";

@Controller()
export class UserCommands {
  constructor(
    private readonly userService: UserService
  ) {}
  @RMQRoute(UserUpdateProfileCommand.topic)
  @RMQValidate()
  async updateProfile(@Body() dto: UserUpdateProfileCommand.Request): Promise<UserUpdateProfileCommand.Response> {
    return this.userService.updateProfile(dto);
  }

  @RMQRoute(UserBuyCourseCommand.topic)
  @RMQValidate()
  async buyCourse(@Body() dto: UserBuyCourseCommand.Request): Promise<UserBuyCourseCommand.Response> {
    return this.userService.buyCourse(dto);
  }

  @RMQRoute(UserCheckPaymentQuery.topic)
  @RMQValidate()
  async checkPayment(@Body() dto: UserCheckPaymentQuery.Request): Promise<UserCheckPaymentQuery.Response> {
    return this.userService.checkPayment(dto);
  }
}

