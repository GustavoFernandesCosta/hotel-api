import { HttpResponse } from "../../src/protocols";
import {
  IUpdateUser,
  IUser,
  IUserResponse,
} from "../interfaces/user.interface";
import { IUsersServiceInterface } from "../services/user.service.interface";
import { CustomError, DefaultError } from "../utils/customErrors";
import { IUsersControllerInterface } from "./user.controller.interface";

export class UsersController implements IUsersControllerInterface {
  constructor(private readonly usersService: IUsersServiceInterface) {}

  async createUser(body: IUser): Promise<HttpResponse<IUserResponse>> {
    try {
      if (!body) {
        return {
          statusCode: 400,
          body: "Missing body",
        };
      }

      const user = await this.usersService.createUser(body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        return {
          statusCode: error.statusCode,
          body: error.message,
        };
      }
      return DefaultError;
    }
  }

  async findUsers(): Promise<HttpResponse<IUserResponse[]>> {
    try {
      const users = await this.usersService.findUsers();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return DefaultError;
    }
  }

  async findUserById(id: string): Promise<HttpResponse<IUserResponse>> {
    try {
      const user = await this.usersService.findUserById(id);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        return {
          statusCode: error.statusCode,
          body: error.message,
        };
      }
      return DefaultError;
    }
  }

  async updateUserById(
    body: IUpdateUser,
    id: string
  ): Promise<HttpResponse<IUserResponse>> {
    try {
      const user = await this.usersService.updateUserById(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        return {
          statusCode: error.statusCode,
          body: error.message,
        };
      }
      return DefaultError;
    }
  }

  async deleteUserById(
    id: string
  ): Promise<HttpResponse<IUserResponse | undefined>> {
    try {
      const result = await this.usersService.deleteUserById(id);

      return {
        statusCode: 204,
        body: result,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        return {
          statusCode: error.statusCode,
          body: error.message,
        };
      }
      return DefaultError;
    }
  }
}
