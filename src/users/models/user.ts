import { Reservation } from "../../reservations/models/reservation";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  reservations: Reservation[];
}
