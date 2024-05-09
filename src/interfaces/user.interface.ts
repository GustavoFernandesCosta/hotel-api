export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  balance?: number;
}

export interface IUserResponse {
  name: string;
  email: string;
  balance?: number;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  balance?: number;
}
