import {
  IUpdateUser,
  IUser,
  IUserResponse,
} from "../interfaces/user.interface";

export interface IUsersInterfaceRepository {
  createUser(body: IUser): Promise<IUserResponse>;
  findUsers(): Promise<IUserResponse[]>;
  findUserById(id: string): Promise<IUserResponse>;
  findUserByEmail(email: string): Promise<IUser | null>;
  updateUserById(id: string, body: IUpdateUser): Promise<IUserResponse>;
  deleteUserById(id: string): Promise<IUserResponse | undefined>;
}
