import { AuthService } from './auth.service';
import {UserGetCoursesQuery, UserGetInfoQuery} from '@micro/contracts';
import {RMQRoute, RMQValidate} from "nestjs-rmq";
import {Body, Controller} from "@nestjs/common";

@Controller()
export class UserQueries {
  constructor(private readonly authService: AuthService) {}

  @RMQRoute(UserGetInfoQuery.topic)
  @RMQValidate()
  async getUserInfo(@Body() { id }: UserGetInfoQuery.Request): Promise<UserGetInfoQuery.Response> {
    const user = await this.authService.findUserById(id);

    return { user }
  }

  @RMQRoute(UserGetCoursesQuery.topic)
  @RMQValidate()
  async getUserCourses(@Body() { id }: UserGetCoursesQuery.Request): Promise<UserGetCoursesQuery.Response> {
    const user = await this.authService.findUserById(id);

    return {
      courses: user.courses
    }
  }
}
