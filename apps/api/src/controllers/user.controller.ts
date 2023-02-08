import {
  BadRequestException,
  Body,
  Controller, Get,
  Put, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import {UserUpdateProfileCommand, UserGetInfoQuery, UserGetCoursesQuery} from '@micro/contracts';
import {RMQService} from "nestjs-rmq";
import {JWTAuthGuard} from "../guards/jwt.guard";
import UserId from "../decorators/user.id.decorator";

@Controller('user')
export class UserController {
  constructor(private rmqService: RMQService) {}

  @UsePipes(new ValidationPipe())
  @Put('update-profile')
  @UseGuards(JWTAuthGuard)
  async updateProfile(@Body() dto: UserUpdateProfileCommand.Request) {
    try {
      return await this.rmqService.send<UserUpdateProfileCommand.Request, UserUpdateProfileCommand.Response>(UserUpdateProfileCommand.topic, dto)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
  @Get('user-info')
  @UseGuards(JWTAuthGuard)
  async userInfo(@UserId() userId: string) {
    try {
      return await this.rmqService.send<UserGetInfoQuery.Request, UserGetInfoQuery.Response>(UserGetInfoQuery.topic, { id: userId })
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  @Get('user-courses')
  @UseGuards(JWTAuthGuard)
  async userCourses(@UserId() userId: string) {
    try {
      return await this.rmqService.send<UserGetCoursesQuery.Request, UserGetCoursesQuery.Response>(UserGetCoursesQuery.topic, { id: userId })
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
