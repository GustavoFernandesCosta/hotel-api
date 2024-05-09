import {
  IHotel,
  IHotelResponse,
  IRoom,
  IUpdateHotel,
  IUpdateRoomsAvailability,
} from "../interfaces/hotel.interface";
import { Hotel } from "../models/hotel.model";

import { IHotelsInterfaceRepository } from "./hotel.repository.interface";

export class HotelRepository implements IHotelsInterfaceRepository {
  async updateRoomsAvailability(body: IUpdateRoomsAvailability): Promise<void> {
    const { available, rooms } = body;
    await Hotel.updateMany(
      { "rooms.roomNumber": { $in: rooms } },
      { $set: { "rooms.$[elem].isAvailable": available } },
      {
        arrayFilters: [
          {
            "elem.roomNumber": { $in: rooms },
          },
        ],
      }
    );
  }

  async findHotelByName(name: string): Promise<IHotel | null> {
    return await Hotel.findOne({ name });
  }

  async saveHotel(data: IHotel): Promise<IHotelResponse> {
    const newHotel = new Hotel(data);
    await newHotel.save();
    return newHotel.toObject();
  }

  async createHotel(data: IHotel): Promise<IHotelResponse> {
    const hotelCreated = await this.saveHotel(data);

    const rooms: IRoom[] = hotelCreated.rooms.map((room) => ({
      roomNumber: room.roomNumber,
      pricePerNight: room.pricePerNight,
      isAvailable: room.isAvailable,
      roomType: room.roomType,
    }));

    return {
      ...hotelCreated,
      rooms,
    };
  }

  async findHotelById(id: string): Promise<IHotelResponse | null> {
    return await Hotel.findOne({ _id: id }, { __v: 0 });
  }

  async updateHotelById(
    id: string,
    data: IUpdateHotel
  ): Promise<IHotelResponse | null> {
    return await Hotel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      projection: { __v: 0, password: 0 },
    });
  }

  async deleteHotelById(id: string): Promise<IHotelResponse | null> {
    return await Hotel.findByIdAndDelete(id);
  }

  async findHotels(): Promise<IHotelResponse[]> {
    return await Hotel.find({}, { __v: 0, password: 0 });
  }
}

export default new HotelRepository();
