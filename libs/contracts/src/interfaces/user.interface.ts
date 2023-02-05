export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Student'
}

export default interface IUser {
  _id?: number;
  displayName?: string,
  email: string;
  passwordHash: string;
  role: UserRole
}
