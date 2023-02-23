import {IsString} from "class-validator";

export namespace PaymentGenerateLinkCommand {
  export const topic = 'payment.generate-link.command'

  export class Request {
    @IsString()
    courseId: string
    userId: string
    price: number
  }

  export class Response {
    paymentLink: string
  }
}
