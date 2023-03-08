import {RMQRoute, RMQService, RMQValidate} from "nestjs-rmq";
import {UserBuyCourseCommand, UserCheckPaymentQuery, UserUpdateProfileCommand} from "@micro/contracts";
import {BadRequestException, Body, Controller} from "@nestjs/common";
import {UserRepository} from "../user.repository";
import {UserEntity} from "../user.entity";
import {BuyCourseSaga} from "../sagas/courses/buy-course.saga";

@Controller()
export class UserCommands {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService

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

  @RMQRoute(UserBuyCourseCommand.topic)
  @RMQValidate()
  async buyCourse(@Body() dto: UserBuyCourseCommand.Request): Promise<UserBuyCourseCommand.Response> {
    const existedUser = await this.userRepository.findUserById(dto.userId);

    if (!existedUser) {
      throw new BadRequestException('user not found');
    }

    const userEntity = new UserEntity(existedUser)
    const courseState = new BuyCourseSaga(dto.courseId, userEntity, this.rmqService)

    const { paymentLink, user } =  await courseState.getState().pay()

    await this.userRepository.updateUser(user)

    return { paymentUrl: paymentLink}
  }

  @RMQRoute(UserCheckPaymentQuery.topic)
  @RMQValidate()
  async checkPayment(@Body() dto: UserCheckPaymentQuery.Request): Promise<UserCheckPaymentQuery.Response> {
    const existedUser = await this.userRepository.findUserById(dto.userId);

    if (!existedUser) {
      throw new BadRequestException('user not found');
    }

    const userEntity = new UserEntity(existedUser)
    const courseState = new BuyCourseSaga(dto.courseId, userEntity, this.rmqService)

    const { user, status } =  await courseState.getState().checkPayment()

    await this.userRepository.updateUser(user)

    return { status }
  }
}

