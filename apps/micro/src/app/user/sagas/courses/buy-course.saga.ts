import {UserEntity} from "../../user.entity";
import {RMQService} from "nestjs-rmq";
import {BuyCourseState} from "./states/buy-course.state";
import {PurchaseState} from "@micro/interfaces";
import {BuyCourseStartedState} from "./states/buy-course-started.state";

export class BuyCourseSaga {
  private state: BuyCourseState;

  public constructor(public courseId: string, public user: UserEntity, public rmqService: RMQService) {}

  public setState(state: PurchaseState) {
    switch (state) {
      case PurchaseState.Started:
        this.state = new BuyCourseStartedState(this)
        break;
      case PurchaseState.Purchased:
        break;
      case PurchaseState.WaitingForPurchasing:
        break;
      case PurchaseState.Canceled:
        break;
    }
  }

  public getState() {
    return this.state;
  }

  public updateStatus(status: PurchaseState) {
    this.user.updateCourseStatus(this.courseId, status)
  }
}