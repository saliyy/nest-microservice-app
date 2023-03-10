import {IsString} from "class-validator";
import {PurchaseState} from "@micro/interfaces";

export namespace UserChangedCourseEvent {
  export const topic = 'user.changed-course.event'

  export class Event {
    @IsString()
    userId: string

    @IsString()
    courseId: string

    @IsString()
    status: PurchaseState
  }
}
