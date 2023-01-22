export namespace AccountRegister {
  export const topic = 'account.register.command'


  export class Request {
    login: string;
    password: string;
  }


  export class Response {
    email: string;
  }
}
