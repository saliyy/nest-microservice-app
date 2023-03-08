import {Injectable} from "@nestjs/common";
import {IUser, IUserCourses, PurchaseState, UserRole} from "@micro/interfaces";

@Injectable()
export class UserEntity implements IUser {
  _id: string;
  courses: IUserCourses[];
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  constructor(user: IUser) {
    this._id          = user._id
    this.courses      = user.courses
    this.displayName  = user.displayName
    this.email        = user.email
    this.passwordHash = user.passwordHash
    this.role         = user.role
  }

  public addCourse(courseId: string): void|never {
    const exists = this.courses.find((course) => course.courseId === courseId)

    if (exists) {
      throw new Error("Course already exists!")
    }

    this.courses.push({courseId, purchaseState: PurchaseState.Started});
  }

  public deleteCourse(courseId: string): void {
    this.courses = this.courses.filter((course) => course.courseId === courseId)
  }

  public updateCourseStatus(courseId: string, status: PurchaseState = PurchaseState.Started): IUserCourses|never {
    const courseToUpdate = this.courses.find((course) => course.courseId === courseId)

    if (!courseToUpdate) {
      throw new Error("course to update not found!")
    }

    courseToUpdate.purchaseState = status

    return courseToUpdate;
  }

  updateProfile(displayName: string, role: UserRole): IUser {
    this.displayName = displayName
    this.role        = role
    return this;
  }
}
