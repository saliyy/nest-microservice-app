import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';
import {prop} from '@typegoose/typegoose';
import {IUser, IUserCourses, PurchaseState, UserRole} from "@micro/interfaces";


export class UserCoursesModel implements IUserCourses
{
  @prop({ type: String })
  courseId;

  @prop({ enum: PurchaseState, required: true, type: () => String, default: PurchaseState.Started })
  purchaseState: PurchaseState
}

export class UserModel extends TimeStamps implements IUser {
  @prop()
  displayName?: string;

  @prop({ enum: UserRole, type: () => String, default: UserRole.Student })
  role: UserRole

	@prop({ unique: true })
	email: string;

	@prop()
	passwordHash: string;

  @prop({ type: () => [UserCoursesModel], required: false })
  courses?: UserCoursesModel[];
}
