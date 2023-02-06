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
    courseId: string,
    purchaseState: PurchaseState
}

export interface IUser {
  _id: string;
  displayName?: string,
  email: string;
  passwordHash: string;
  role: UserRole,

  courses?: IUserCourses[]
}
