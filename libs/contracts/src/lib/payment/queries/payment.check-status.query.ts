import {IsString} from "class-validator";

export namespace PaymentCheckStatusQuery {
  export const topic = 'payment.check-status.query'

  export class Request {
    @IsString()
    courseId: string

    @IsString()
    userId: string
  }

  export class Response {
    status: 'success' | 'canceled' | 'progress'
  }
}
