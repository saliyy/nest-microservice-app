import {IsString} from "class-validator";
import {IUserCourses} from "@micro/interfaces";

export namespace UserGetCoursesQuery {
  export const topic = 'user.get-courses.queries'

  export class Request {
    @IsString()
    id: string
  }

  export class Response {
    courses: IUserCourses[]
  }
}
