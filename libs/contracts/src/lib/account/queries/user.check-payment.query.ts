import {IsString} from "class-validator";
import {PaymentStatus} from "../../payment/queries/payment.check-status.query";

export namespace UserCheckPaymentQuery {
  export const topic = 'user.check-payment.query';

  export class Request {
    @IsString()
    courseId: string

    @IsString()
    userId: string
  }

  export class Response {
    status: PaymentStatus
  }
}
