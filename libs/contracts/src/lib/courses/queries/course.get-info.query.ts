import {IsString} from "class-validator";
import {ICourse, IUserCourses} from "@micro/interfaces";

export namespace CourseGetInfoQuery {
  export const topic = 'course.get-info.query'

  export class Request {
    @IsString()
    id: string
  }

  export class Response {
    course: ICourse|null
  }
}
