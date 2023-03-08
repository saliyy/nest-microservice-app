import {BuyCourseState} from "./buy-course.state";
import {BuyCourseSaga} from "../buy-course.saga";
import {UserEntity} from "../../../user.entity";
import {PaymentCheckStatusQuery} from "@micro/contracts";
import {PurchaseState} from "@micro/interfaces";


export class BuyCourseProgressState extends BuyCourseState {
  public constructor(saga: BuyCourseSaga) {
    super(saga);
  }

  async pay(): Promise<{ paymentLink: string | null; user: UserEntity }> {
    throw new Error("Payment in progress")
  }

  async cancel(): Promise<UserEntity> {
    throw new Error("Cannot cancel in progress course")
  }

  async checkPayment(): Promise<UserEntity> {
    const { status } = await this.saga.rmqService.send<PaymentCheckStatusQuery.Request, PaymentCheckStatusQuery.Response>(PaymentCheckStatusQuery.topic, {
      courseId: this.saga.courseId,
      userId: this.saga.user._id
    })

    if (status == "canceled") {
      this.saga.setState(PurchaseState.Canceled)
      return this.saga.user
    }

    if (status !== 'success') {
      return this.saga.user
    }

    this.saga.setState(PurchaseState.Purchased)
  }

}
