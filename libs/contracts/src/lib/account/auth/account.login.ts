export namespace AccountLogin {
  export const topic = 'account.login.command';

  export class Request {
    login: string;
    password: string;
  }

  export class Response {
    access_token: string;
  }
}
