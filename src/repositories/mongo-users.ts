import { User } from "../users/models/user";
import { IUsersRepository } from "../users/protocols";

export class MongoUsersRepository implements IUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        id: "1",
        name: "John Doe",
        email: "teste#gemail.com",
        password: "123",
        balance: 1000,
        reservations: [],
      },
    ];
  }
}
