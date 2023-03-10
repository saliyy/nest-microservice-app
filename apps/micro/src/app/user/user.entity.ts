import {Injectable} from "@nestjs/common";
import {IDomainEvent, IUser, IUserCourses, PurchaseState, UserRole} from "@micro/interfaces";
import {UserChangedCourseEvent} from "@micro/contracts";

@Injectable()
export class UserEntity implements IUser {
  _id: string;
  courses: IUserCourses[];
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  // domain events
  domainEvents: IDomainEvent[] = [];

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

  public setCourseStatus(courseId: string, state: PurchaseState) {
    const exist = this.courses.find(c => c.courseId === courseId);
    if (!exist) {
      this.courses.push({
        courseId,
        purchaseState: state
      });
      return this;
    }
    if (state === PurchaseState.Canceled) {
      this.courses = this.courses.filter(c => c.courseId !== courseId);
      return this;
    }
    this.courses = this.courses.map(c => {
      if (c.courseId === courseId) {
        c.purchaseState = state;
        return c;
      }
      return c;
    });
    this.domainEvents.push({
      topic: UserChangedCourseEvent.topic,
      data: { userId: this._id, courseId: courseId, status: state} as UserChangedCourseEvent.Event
    })
  }

  public getCourseState(courseId: string): PurchaseState {
    return this.courses.find(c => c.courseId === courseId)?.purchaseState ?? PurchaseState.Started;
  }

  updateProfile(displayName: string, role: UserRole): IUser {
    this.displayName = displayName
    this.role        = role
    return this;
  }
}
