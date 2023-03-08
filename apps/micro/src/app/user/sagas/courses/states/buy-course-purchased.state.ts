import {BuyCourseState} from "./buy-course.state";
import {BuyCourseSaga} from "../buy-course.saga";
import {UserEntity} from "../../../user.entity";

export class BuyCoursePurchasedState extends BuyCourseState {
  public constructor(saga: BuyCourseSaga) {
    super(saga);
  }

  async pay(): Promise<{ paymentLink: string | null; user: UserEntity }> {
    throw new Error("course already purchased")
  }

  async cancel(): Promise<UserEntity> {
    throw new Error("cannot cancel purchased course")
  }

  async checkPayment(): Promise<UserEntity> {
    throw new Error("cannot check payment of purchased course")
  }

}
