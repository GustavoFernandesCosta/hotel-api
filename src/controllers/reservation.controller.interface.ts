import { HttpResponse } from "../../src/protocols";
import {
  IDownloadPdf,
  IReservation,
  IReservationResponse,
  IUpdateReservation,
} from "../interfaces/reservation.interface";

export interface IReservationControllerInterface {
  createReservation(
    body: IReservation
  ): Promise<HttpResponse<IReservationResponse>>;
  uploadPaymentPdf(
    file: any,
    id: string
  ): Promise<HttpResponse<IReservationResponse>>;
  findReservationById(id: string): Promise<HttpResponse<IReservationResponse>>;
  findReservations(): Promise<HttpResponse<IReservationResponse[]>>;
  updateReservationById(
    id: string,
    body: IUpdateReservation
  ): Promise<HttpResponse<IReservationResponse | null>>;
  deleteReservationById(
    id: string
  ): Promise<HttpResponse<IReservationResponse | undefined>>;
  downloadPdf(id: string): Promise<IDownloadPdf>;
}
