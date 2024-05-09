import {
  IUpdateUser,
  IUser,
  IUserResponse,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { IUsersInterfaceRepository } from "./user.repository.interface";
import {} from "../utils/customErrors";
import { UserNotFoundError } from "../utils/userErros";

export class UserRepository implements IUsersInterfaceRepository {
  async createUser(data: IUser): Promise<IUserResponse> {
    const newUser = new User(data);
    await newUser.save();

    return newUser.toObject();
  }

  async findUserById(id: string): Promise<IUserResponse> {
    const user = await User.findOne({ _id: id }, { __v: 0, password: 0 });

    if (!user) throw new UserNotFoundError();

    return user.toObject();
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async updateUserById(id: string, body: IUpdateUser): Promise<IUserResponse> {
    const userUpdated = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      projection: { __v: 0, password: 0 },
    });
    if (!userUpdated) throw new UserNotFoundError();

    return userUpdated;
  }

  async deleteUserById(id: string): Promise<IUserResponse | undefined> {
    const userDeleted = await User.findByIdAndDelete(id).exec();

    if (!userDeleted) throw new UserNotFoundError();

    return userDeleted.toObject();
  }

  async findUsers(): Promise<IUserResponse[]> {
    const users = await User.find({}, { __v: 0, password: 0 });

    return users;
  }
}

export default new UserRepository();
