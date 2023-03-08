import {BuyCourseState} from "./buy-course.state";
import {BuyCourseSaga} from "../buy-course.saga";
import {UserEntity} from "../../../user.entity";
import {PurchaseState} from "@micro/interfaces";
import {PaymentStatus} from "@micro/contracts";

export class BuyCourseCanceledState extends BuyCourseState {
  public constructor(saga: BuyCourseSaga) {
    super(saga);
  }

  async pay(): Promise<{ paymentLink: string | null; user: UserEntity }> {
    this.saga.setState(PurchaseState.Started)
    return this.saga.getState().pay()
  }

  async cancel(): Promise<UserEntity> {
    throw new Error("course already canceled")
  }

  async checkPayment(): Promise<{ user: UserEntity; status: PaymentStatus }>{
    throw new Error("cannot check payment on canceled course")
  }

}
