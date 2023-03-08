import {UserEntity} from "../../user.entity";
import {RMQService} from "nestjs-rmq";
import {BuyCourseState} from "./states/buy-course.state";
import {PurchaseState} from "@micro/interfaces";
import {BuyCourseStartedState} from "./states/buy-course-started.state";
import {BuyCoursePurchasedState} from "./states/buy-course-purchased.state";
import {BuyCourseProgressState} from "./states/buy-course-progress.state";
import {BuyCourseCanceledState} from "./states/buy-course-canceled.state";

export class BuyCourseSaga {
  private state: BuyCourseState;

  public constructor(public courseId: string, public user: UserEntity, public rmqService: RMQService) {}

  public setState(state: PurchaseState) {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyCourseStartedState(this)
        break;
      case PurchaseState.Purchased:
        this.state = new BuyCoursePurchasedState(this)
        break;
      case PurchaseState.WaitingForPurchasing:
        this.state = new BuyCourseProgressState(this)
        break;
      case PurchaseState.Canceled:
        this.state = new BuyCourseCanceledState(this)
        break;
    }

    this.updateStatus(state)
  }

  public getState(): BuyCourseState {
    return this.state
  }


  public updateStatus(status: PurchaseState) {
    this.user.updateCourseStatus(this.courseId, status)
  }
}
