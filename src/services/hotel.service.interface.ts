import {
  IHotel,
  IHotelResponse,
  IUpdateHotel,
} from "../interfaces/hotel.interface";

export interface IHotelsServiceInterface {
  createHotel(body: IHotel): Promise<IHotelResponse>;
  findHotels(): Promise<IHotelResponse[]>;
  findHotelById(id: string): Promise<IHotelResponse>;
  updateHotelById(
    id: string,
    body: IUpdateHotel
  ): Promise<IHotelResponse | null>;
  deleteHotelById(id: string): Promise<IHotelResponse | null>;
}
