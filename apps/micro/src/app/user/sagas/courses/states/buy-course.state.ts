import {BuyCourseSaga} from "../buy-course.saga";
import {UserEntity} from "../../../user.entity";
import {PaymentStatus} from "@micro/contracts";

export abstract class BuyCourseState {
  public constructor(public saga: BuyCourseSaga) {}

  public setContext(saga: BuyCourseSaga) {
    this.saga = saga
  }

  public abstract pay(): Promise<{ paymentLink: string|null, user: UserEntity }>|never

  public abstract checkPayment(): Promise<{ user: UserEntity; status: PaymentStatus }>

  public abstract cancel(): Promise<UserEntity>|never
}
