import { IUsersController, IUsersService } from "./protocols";

export class UsersController implements IUsersController {
  constructor(private readonly usersService: IUsersService) {}

  async getAll() {
    try {
      const users = await this.usersService.getUsers();
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
