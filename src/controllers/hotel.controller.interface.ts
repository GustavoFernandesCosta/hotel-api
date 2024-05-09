import { HttpResponse } from "../../src/protocols";
import {
  IHotel,
  IHotelResponse,
  IUpdateHotel,
} from "../interfaces/hotel.interface";

export interface IHotelControllerInterface {
  createHotel(body: IHotel): Promise<HttpResponse<IHotelResponse>>;
  findHotels(): Promise<HttpResponse<IHotelResponse[]>>;
  findHotelById(id: string): Promise<HttpResponse<IHotelResponse>>;
  updateHotelById(
    id: string,
    body: IUpdateHotel
  ): Promise<HttpResponse<IHotelResponse | null>>;
  deleteHotelById(id: string): Promise<HttpResponse<IHotelResponse | null>>;
}
