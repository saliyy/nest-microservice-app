import {BuyCourseState} from "./buy-course.state";
import {BuyCourseSaga} from "../buy-course.saga";
import {UserEntity} from "../../../user.entity";
import {CourseGetInfoQuery, PaymentGenerateLinkCommand, PaymentStatus} from "@micro/contracts";
import {PurchaseState} from "@micro/interfaces";

export class BuyCourseStartedState extends BuyCourseState {
  public constructor(saga: BuyCourseSaga) {
    super(saga);
  }

  async pay(): Promise<{ paymentLink: string | null; user: UserEntity }> {
    const {course} = await this.saga.rmqService.send<CourseGetInfoQuery.Request, CourseGetInfoQuery.Response>(CourseGetInfoQuery.topic,
      {id: this.saga.courseId})

    if (!course) {
      throw new Error("Course not found!")
    }

    if (course.price === 0) {
      this.saga.setState(PurchaseState.Purchased)
      return { paymentLink: null, user: this.saga.user }
    }

    const { paymentLink } = await this.saga.rmqService
      .send<PaymentGenerateLinkCommand.Request, PaymentGenerateLinkCommand.Response>(PaymentGenerateLinkCommand.topic, {
        courseId: this.saga.courseId,
        userId: this.saga.user._id,
        price: course.price
      })

    this.saga.setState(PurchaseState.WaitingForPurchasing)

    return { paymentLink: paymentLink, user: this.saga.user }
  }

  async cancel(): Promise<UserEntity> {
    this.saga.setState(PurchaseState.Canceled)
    return this.saga.user
  }

  async checkPayment():  Promise<{ user: UserEntity; status: PaymentStatus }> {
    throw new Error("Cannot cancel not purchased course")
  }

}
