import {BuyCourseSaga} from "../buy-course.saga";
import {UserEntity} from "../../../user.entity";

export abstract class BuyCourseState {
  public constructor(public saga: BuyCourseSaga) {}

  public setContext(saga: BuyCourseSaga) {
    this.saga = saga
  }

  public abstract pay(): Promise<{ paymentLink: string|null, user: UserEntity }>|never

  public abstract checkPayment(): Promise<UserEntity>|never

  public abstract cancel(): Promise<UserEntity>|never
}
