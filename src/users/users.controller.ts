import { IUsersController, IUsersRepository } from "./protocols";

export class UsersController implements IUsersController {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async getAll() {
    try {
      const users = await this.usersRepository.getUsers();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong!",
      };
    }
  }
}
