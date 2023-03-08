import {BuyCourseState} from "./buy-course.state";
import {BuyCourseSaga} from "../buy-course.saga";
import {UserEntity} from "../../../user.entity";
import {PurchaseState} from "@micro/interfaces";
import {PaymentStatus} from "@micro/contracts";

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

  async checkPayment():Promise<{ user: UserEntity; status: PaymentStatus }>{
    throw new Error("cannot check payment of purchased course")
  }

}
