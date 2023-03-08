import {BuyCourseState} from "./buy-course.state";
import {BuyCourseSaga} from "../buy-course.saga";
import {UserEntity} from "../../../user.entity";
import {PaymentCheckStatusQuery, PaymentStatus} from "@micro/contracts";
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

  public async checkPayment(): Promise<{ user: UserEntity; status: PaymentStatus }> {
    const { status } = await this.saga.rmqService.send<PaymentCheckStatusQuery.Request, PaymentCheckStatusQuery.Response>(PaymentCheckStatusQuery.topic, {
      userId: this.saga.user._id,
      courseId: this.saga.courseId
    });
    if (status === 'canceled') {
      this.saga.setState(PurchaseState.Canceled);
      return { user: this.saga.user, status: 'canceled' };
    }
    if (status === 'success') {
      return { user: this.saga.user, status: 'success' };
    }
    this.saga.setState(PurchaseState.Purchased);
    return { user: this.saga.user, status: 'progress' };
  }

}
