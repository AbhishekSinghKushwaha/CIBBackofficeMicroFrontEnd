export interface UserListModel {
    name: string;
    date: string;
    paymentType: string;
    bankReference: string;
    corporateReference: string;
    recepientName: string;
    amount: string;
    transactionType: string;
    status?: string;
  }

export interface  UserModel {
  id: string;
  userName: string;
  emailAddress: string;
  phoneNumber: string;
  identityNumber: string;
  accountNumber: string;
  cifNumber:string;
  name: string;
  officePhoneNumber: string;
  profilePictureUrl: string;
  isActive: boolean;
  language: string;
  currency: string;
  status: string;
  creationTime: string;
}

export interface UserProduct {
  id: string;
  productGroupId: string;
  name?: string;
  description?: string;
  subProducts: UserSubProduct[];
}
export interface UserSubProduct {
  id?: string;
  productId: string;
  name?: string;
  description?: string;
}
