import { HttpResponse } from "../../src/protocols";
import {
  IUpdateUser,
  IUser,
  IUserResponse,
} from "../interfaces/user.interface";

export interface IUsersControllerInterface {
  createUser(body: IUser): Promise<HttpResponse<IUserResponse>>;
  findUsers(): Promise<HttpResponse<IUserResponse[]>>;
  findUserById(id: string): Promise<HttpResponse<IUserResponse>>;
  updateUserById(
    body: IUpdateUser,
    id: string
  ): Promise<HttpResponse<IUserResponse>>;
  deleteUserById(id: string): Promise<HttpResponse<IUserResponse | undefined>>;
}
