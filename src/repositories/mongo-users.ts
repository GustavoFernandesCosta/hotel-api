import { MongoClient } from "../database/mongo";
import { User } from "../users/models/user";
import { IUsersRepository } from "../users/protocols";

export class MongoUsersRepository implements IUsersRepository {
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
