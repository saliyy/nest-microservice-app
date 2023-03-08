import {IsString} from "class-validator";

export namespace UserBuyCourseCommand {
  export const topic = 'user.buy-course.command';

  export class Request {
    @IsString()
    courseId: string

    @IsString()
    userId: string
  }

  export class Response {
    paymentUrl: string
  }
}
