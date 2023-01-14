import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';
import {prop} from '@typegoose/typegoose';


export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Student'
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
}
