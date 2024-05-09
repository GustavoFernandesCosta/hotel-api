export interface IHotel {
  _id?: string;
  name: string;
  location: string;
  rooms: IRoom[];
}

export interface IHotelResponse {
  id: string;
  name: string;
  location: string;
  rooms: IRoom[];
}

export interface IRoom {
  _id?: string;
  roomNumber: number;
  pricePerNight: number;
  isAvailable: boolean;
  roomType: string;
}
export interface IUpdateHotel {
  name?: string;
  location?: string;
  rooms?: IRoom[];
}

export interface IUpdateRoomsAvailability {
  hotelId: string;
  rooms: number;
  available: boolean;
}
