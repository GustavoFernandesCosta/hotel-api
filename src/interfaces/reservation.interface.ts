import { IHotel, IRoom } from "./hotel.interface";
import { IUser } from "./user.interface";

export interface IReservation {
  _id?: string;
  userEmail: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number[];
}

export interface IReservationCreate {
  hotel: IHotel;
  user: IUser;
  checkInDate: string;
  checkOutDate: string;
  rooms: IRoom[];
  totalCost: number;
}

export interface IReservationResponse {
  id: string;
  userName: string;
  hotel: Omit<IHotel, "rooms">;
  checkInDate: string;
  checkOutDate: string;
  rooms: IRoom[];
  totalCost: number;
  pdfPath: string;
  status: string;
}

export interface IUpdateReservation {
  checkInDate: string;
  checkOutDate: string;
  rooms: number[];
}

export interface IDownloadPdf {
  userName: string;
  hotel: {
    name: string;
    location: string;
  };
  checkInDate: string;
  checkOutDate: string;
  rooms: IRoom[];
  totalCost: number;
  pdfPath: string;
  status: string;
}
