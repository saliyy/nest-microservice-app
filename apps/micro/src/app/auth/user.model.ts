import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';
import {prop} from '@typegoose/typegoose';
import {PurchaseState, UserRole} from "@micro/contracts";



export interface UserCoursesModel extends Base {}

export class UserCoursesModel
{
  @prop({ enum: PurchaseState, required: true, type: String })
  purchaseState: PurchaseState
}


export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
  @prop()
  name?: string;


  @prop({ enum: UserRole })
  role: UserRole

	@prop({ unique: true })
	email: string;

	@prop()
	passwordHash: string;

  @prop({ type: () => [UserCoursesModel], required: false })
  courses?: UserCoursesModel[];
}
