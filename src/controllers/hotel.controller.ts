import { HttpResponse } from "../../src/protocols";
import {
  IHotel,
  IHotelResponse,
  IUpdateHotel,
} from "../interfaces/hotel.interface";
import { IHotelsServiceInterface } from "../services/hotel.service.interface";
import { CustomError, DefaultError } from "../utils/customErrors";
import { IHotelControllerInterface } from "./hotel.controller.interface";

export class HotelsController implements IHotelControllerInterface {
  constructor(private readonly hotelsService: IHotelsServiceInterface) {}

  async createHotel(body: IHotel): Promise<HttpResponse<IHotelResponse>> {
    try {
      if (!body) {
        return {
          statusCode: 400,
          body: "Missing body",
        };
      }

      const hotel = await this.hotelsService.createHotel(body);

      return {
        statusCode: 201,
        body: hotel,
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

  async findHotels(): Promise<HttpResponse<IHotelResponse[]>> {
    try {
      const hotels = await this.hotelsService.findHotels();
      return {
        statusCode: 200,
        body: hotels,
      };
    } catch (error) {
      return DefaultError;
    }
  }

  async findHotelById(id: string): Promise<HttpResponse<IHotelResponse>> {
    try {
      const hotel = await this.hotelsService.findHotelById(id);
      return {
        statusCode: 200,
        body: hotel,
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

  async updateHotelById(
    id: string,
    body: IUpdateHotel
  ): Promise<HttpResponse<IHotelResponse | null>> {
    try {
      const hotel = await this.hotelsService.updateHotelById(id, body);

      return {
        statusCode: 200,
        body: hotel,
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

  async deleteHotelById(
    id: string
  ): Promise<HttpResponse<IHotelResponse | null>> {
    try {
      const result = await this.hotelsService.deleteHotelById(id);

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
