import {
  IHotel,
  IHotelResponse,
  IRoom,
  IUpdateHotel,
} from "../interfaces/hotel.interface";
import { IHotelsInterfaceRepository } from "../repositories/hotel.repository.interface";
import {
  HotelAlreadyExistsError,
  HotelNotFoundError,
} from "../utils/hotelErrors";
import { IHotelsServiceInterface } from "./hotel.service.interface";

export class HotelsService implements IHotelsServiceInterface {
  constructor(private readonly hotelsRepository: IHotelsInterfaceRepository) {}

  async createHotel(data: IHotel): Promise<IHotelResponse> {
    const existingHotel = await this.hotelsRepository.findHotelByName(
      data.name
    );
    if (existingHotel) throw new HotelAlreadyExistsError();

    const hotel = await this.hotelsRepository.createHotel(data);

    return hotel;
  }

  async updateHotelById(
    id: string,
    body: IUpdateHotel
  ): Promise<IHotelResponse | null> {
    const hotelUpdated = await this.hotelsRepository.updateHotelById(id, body);

    if (!hotelUpdated) throw new HotelNotFoundError();

    return hotelUpdated;
  }

  async findHotelById(id: string): Promise<IHotelResponse> {
    const hotel = await this.hotelsRepository.findHotelById(id);

    if (!hotel) throw new HotelNotFoundError();

    return hotel;
  }

  async findHotels(): Promise<IHotelResponse[]> {
    const hotels = await this.hotelsRepository.findHotels();

    if (!hotels) throw new HotelNotFoundError();

    return hotels;
  }

  async deleteHotelById(id: string): Promise<IHotelResponse | null> {
    const hotelDeleted = this.hotelsRepository.deleteHotelById(id);

    if (!hotelDeleted) throw new HotelNotFoundError();

    return hotelDeleted;
  }
}
