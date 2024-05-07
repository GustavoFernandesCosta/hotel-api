import { IUsersRepository, IUsersService } from "./protocols";

export class UserService implements IUsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async getUsers() {
    return this.usersRepository.getUsers();
  }
}
