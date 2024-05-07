import { HttpResponse } from "../protocols";
import { CreateUserDto } from "./dto/userDto";
import { User } from "./models/user";

export interface IUsersController {
  getAll(): Promise<HttpResponse<User[]>>;
}

export interface IUsersService {
  getUsers(): Promise<User[]>;
}

export interface IUsersRepository {
  getUsers(): Promise<User[]>;
  createUser(body: CreateUserDto): Promise<User>;
}
