import {
  IUpdateUser,
  IUser,
  IUserResponse,
} from "../interfaces/user.interface";

export interface IUsersServiceInterface {
  createUser(body: IUser): Promise<IUserResponse>;
  findUsers(): Promise<IUserResponse[]>;
  findUserById(id: string): Promise<IUserResponse>;
  updateUserById(id: string, body: IUpdateUser): Promise<IUserResponse>;
  deleteUserById(id: string): Promise<IUserResponse | undefined>;
}
