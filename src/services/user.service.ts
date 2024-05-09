import { hashSync } from "bcrypt";
import {
  IUpdateUser,
  IUser,
  IUserResponse,
} from "../interfaces/user.interface";
import { IUsersInterfaceRepository } from "../repositories/user.repository.interface";
import { UserAlreadyExistsError, UserNotFoundError } from "../utils/userErros";
import { IUsersServiceInterface } from "./user.service.interface";

export class UserService implements IUsersServiceInterface {
  constructor(private readonly usersRepository: IUsersInterfaceRepository) {}

  async createUser(data: IUser): Promise<IUserResponse> {
    const existingUser = await this.usersRepository.findUserByEmail(data.email);
    if (existingUser) throw new UserAlreadyExistsError();

    data.password = hashSync(data.password, 10);

    const newUser = await this.usersRepository.createUser(data);

    return newUser;
  }

  async findUserById(id: string): Promise<IUserResponse> {
    const user = await this.usersRepository.findUserById(id);

    return user;
  }

  async updateUserById(id: string, body: IUpdateUser): Promise<IUserResponse> {
    if (body.password) {
      body.password = hashSync(body.password, 10);
    }

    const userUpdated = await this.usersRepository.updateUserById(id, body);

    return userUpdated;
  }

  async findUsers(): Promise<IUserResponse[]> {
    const users = await this.usersRepository.findUsers();

    if (!users) throw new UserNotFoundError();

    return users;
  }

  async deleteUserById(id: string): Promise<IUserResponse | undefined> {
    return this.usersRepository.deleteUserById(id);
  }
}
