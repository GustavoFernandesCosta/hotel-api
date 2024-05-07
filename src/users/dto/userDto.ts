import { Reservation } from "../../reservations/models/reservation";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  balance: number;
  reservations: Reservation[];
}
