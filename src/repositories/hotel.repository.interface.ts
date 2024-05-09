import {
  IHotel,
  IHotelResponse,
  IUpdateHotel,
  IUpdateRoomsAvailability,
} from "../interfaces/hotel.interface";

export interface IHotelsInterfaceRepository {
  updateRoomsAvailability(body: IUpdateRoomsAvailability): Promise<void>;
  findHotelByName(name: string): Promise<IHotel | null>;
  saveHotel(data: IHotel): Promise<IHotelResponse>;
  createHotel(body: IHotel): Promise<IHotelResponse>;
  findHotels(): Promise<IHotelResponse[]>;
  findHotelById(id: string): Promise<IHotelResponse | null>;
  updateHotelById(
    id: string,
    body: IUpdateHotel
  ): Promise<IHotelResponse | null>;
  deleteHotelById(id: string): Promise<IHotelResponse | null>;
}
