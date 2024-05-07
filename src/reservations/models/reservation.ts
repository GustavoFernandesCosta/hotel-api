export interface Reservation {
  id: string;
  userId: string;
  hotelId: string;
  roomNumber: number;
  numberOfRooms: number;
  checkIn: Date;
  checkOut: Date;
  createdAt: Date;
  updatedAt: Date;
}
