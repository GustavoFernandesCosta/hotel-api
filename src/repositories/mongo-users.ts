import { MongoClient } from "../database/mongo";
import { CreateUserDto } from "../users/dto/userDto";
import { User } from "../users/models/user";
import { IUsersRepository } from "../users/protocols";

export class MongoUsersRepository implements IUsersRepository {
  async createUser(body: CreateUserDto): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(body);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }

  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
