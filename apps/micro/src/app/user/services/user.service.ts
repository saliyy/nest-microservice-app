import {Injectable} from "@nestjs/common";
import {UserRepository} from "../user.repository";
import {UserBuyCourseCommand, UserCheckPaymentQuery, UserUpdateProfileCommand} from "@micro/contracts";
import {UserEntity} from "../user.entity";
import {BuyCourseSaga} from "../sagas/courses/buy-course.saga";
import {RMQService} from "nestjs-rmq";
import UserDomainEventEmitter from "../events/UserDomainEventEmitter";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService,
    private readonly userEventEmitter: UserDomainEventEmitter
  ) {}

  async updateProfile(dto: UserUpdateProfileCommand.Request): Promise<UserUpdateProfileCommand.Response> {
    const userToUpdate = await this.userRepository.findUserById(dto.id);

    if (!userToUpdate) {
      throw new Error('user to update not found');
    }

    const updatedProfile = new UserEntity(userToUpdate).updateProfile(dto.displayName, dto.role)

    await this.userRepository.updateUser(updatedProfile)

    return {
      user: updatedProfile
    }
  }

  async buyCourse(dto: UserBuyCourseCommand.Request): Promise<UserBuyCourseCommand.Response> {
    const existedUser = await this.userRepository.findUserById(dto.userId);

    if (!existedUser) {
      throw new Error('user not found');
    }

    const userEntity = new UserEntity(existedUser)
    const courseState = new BuyCourseSaga(dto.courseId, userEntity, this.rmqService)

    const { paymentLink, user } =  await courseState.getState().pay()

    await this.userRepository.updateUser(user)
    await this.publishEvents(user)

    return { paymentUrl: paymentLink}
  }

  async checkPayment(dto: UserCheckPaymentQuery.Request): Promise<UserCheckPaymentQuery.Response> {
    const existedUser = await this.userRepository.findUserById(dto.userId);

    if (!existedUser) {
      throw new Error('user not found');
    }

    const userEntity = new UserEntity(existedUser)
    const courseState = new BuyCourseSaga(dto.courseId, userEntity, this.rmqService)

    const { user, status } =  await courseState.getState().checkPayment()

    await this.userRepository.updateUser(user)
    await this.publishEvents(user)

    return { status }
  }

  private async publishEvents(user: UserEntity): Promise<void>
  {
     await this.userEventEmitter.emit(user)
  }
}
