import {
  IReservation,
  IReservationCreate,
  IReservationResponse,
  IUpdateReservation,
} from "../interfaces/reservation.interface";

export interface IReservationsInterfaceRepository {
  createReservation(body: IReservationCreate): Promise<IReservationResponse>;
  uploadPaymentPdf(file: any, id: string): Promise<IReservationResponse>;
  findReservationById(id: string): Promise<IReservationResponse | null>;
  findReservations(): Promise<IReservationResponse[]>;
  deleteReservationById(id: string): Promise<IReservationResponse | null>;
  updateReservationById(
    id: string,
    body: IUpdateReservation
  ): Promise<IReservationResponse | null>;
}
