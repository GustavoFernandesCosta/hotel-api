import {
  IDownloadPdf,
  IReservation,
  IReservationResponse,
  IUpdateReservation,
} from "../interfaces/reservation.interface";
import { HttpResponse } from "../protocols";
import { IReservationsServiceInterface } from "../services/reservation.service.interface";
import { CustomError, DefaultError } from "../utils/customErrors";
import { IReservationControllerInterface } from "./reservation.controller.interface";

export class ReservationsController implements IReservationControllerInterface {
  constructor(
    private readonly reservationsService: IReservationsServiceInterface
  ) {}

  async uploadPaymentPdf(
    file: any,
    id: string
  ): Promise<HttpResponse<IReservationResponse>> {
    try {
      if (!file) {
        return {
          statusCode: 400,
          body: "Missing file",
        };
      }

      const reservation = await this.reservationsService.uploadPaymentPdf(
        file,
        id
      );

      return {
        statusCode: 200,
        body: reservation,
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

  async downloadPdf(id: string): Promise<IDownloadPdf> {
    return await this.reservationsService.downloadPdf(id);
  }

  async createReservation(
    body: IReservation
  ): Promise<HttpResponse<IReservationResponse>> {
    try {
      if (!body) {
        return {
          statusCode: 400,
          body: "Missing body",
        };
      }

      const reservation =
        await this.reservationsService.createReservation(body);

      return {
        statusCode: 201,
        body: reservation,
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

  async findReservationById(
    id: string
  ): Promise<HttpResponse<IReservationResponse>> {
    try {
      const reservation =
        await this.reservationsService.findReservationById(id);

      return {
        statusCode: 200,
        body: reservation,
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

  async findReservations(): Promise<HttpResponse<IReservationResponse[]>> {
    try {
      const reservations = await this.reservationsService.findReservations();
      return {
        statusCode: 200,
        body: reservations,
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

  async updateReservationById(
    id: string,
    body: IUpdateReservation
  ): Promise<HttpResponse<IReservationResponse | null>> {
    try {
      const reservation = await this.reservationsService.updateReservationById(
        id,
        body
      );

      return {
        statusCode: 200,
        body: reservation,
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

  async deleteReservationById(
    id: string
  ): Promise<HttpResponse<IReservationResponse | undefined>> {
    try {
      const result = await this.reservationsService.deleteReservationById(id);

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
