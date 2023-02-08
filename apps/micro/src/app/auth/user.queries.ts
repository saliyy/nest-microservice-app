import {UserGetCoursesQuery, UserGetInfoQuery} from '@micro/contracts';
import {RMQRoute, RMQValidate} from "nestjs-rmq";
import {Body, Controller} from "@nestjs/common";
import {UserRepository} from "./user.repository";

@Controller()
export class UserQueries {
  constructor(private readonly userRepository: UserRepository) {}

  @RMQRoute(UserGetInfoQuery.topic)
  @RMQValidate()
  async getUserInfo(@Body() { id }: UserGetInfoQuery.Request): Promise<UserGetInfoQuery.Response> {
    const user = await this.userRepository.findUserById(id);

    return { user }
  }

  @RMQRoute(UserGetCoursesQuery.topic)
  @RMQValidate()
  async getUserCourses(@Body() { id }: UserGetCoursesQuery.Request): Promise<UserGetCoursesQuery.Response> {
    const user = await this.userRepository.findUserById(id);

    return {
      courses: user.courses
    }
  }
}
