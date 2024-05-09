import {
  IDownloadPdf,
  IReservation,
  IReservationResponse,
  IUpdateReservation,
} from "../interfaces/reservation.interface";

export interface IReservationsServiceInterface {
  createReservation(body: IReservation): Promise<IReservationResponse>;
  uploadPaymentPdf(file: any, id: string): Promise<IReservationResponse>;
  findReservationById(id: string): Promise<IReservationResponse>;
  findReservations(): Promise<IReservationResponse[]>;
  deleteReservationById(id: string): Promise<IReservationResponse | undefined>;
  updateReservationById(
    id: string,
    body: IUpdateReservation
  ): Promise<IReservationResponse | null>;
  downloadPdf(id: string): Promise<IDownloadPdf>;
}
