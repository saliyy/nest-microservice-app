export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Student'
}


export enum PurchaseState {
  Started = 'Started',
  Canceled = 'Canceled',
  Purchased = 'Purchased',
  WaitingForPurchasing = 'WaitingForPurchasing'
}

export interface IUserCourses {
    _id: string;
    purchaseState: PurchaseState
}

export default interface IUser {
  _id: string;
  displayName?: string,
  email: string;
  passwordHash: string;
  role: UserRole,

  courses?: IUserCourses[]
}
