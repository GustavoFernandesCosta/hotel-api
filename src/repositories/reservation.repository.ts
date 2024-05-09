import { start } from "repl";
import {
  IReservationCreate,
  IReservationResponse,
  IUpdateReservation,
} from "../interfaces/reservation.interface";
import { Hotel } from "../models/hotel.model";
import { Reservation } from "../models/reservation.model";
import { HotelNotFoundError } from "../utils/hotelErrors";
import { ReservationNotFoundError } from "../utils/reservationErrors";

import { IReservationsInterfaceRepository } from "./reservation.repository.interface";
import { startSession } from "mongoose";

export class ReservationRepository implements IReservationsInterfaceRepository {
  async uploadPaymentPdf(file: any, id: string): Promise<IReservationResponse> {
    const reservation = await Reservation.findById(id);
    if (!reservation) throw new ReservationNotFoundError();

    reservation.pdfPath = file.path;
    reservation.status = "confirmed";

    const reservationSaved = await reservation.save();

    return reservationSaved.toObject();
  }

  async createReservation(
    data: IReservationCreate
  ): Promise<IReservationResponse> {
    const { hotel, user, checkInDate, checkOutDate, rooms, totalCost } = data;

    const newReservation = new Reservation({
      userName: user.name,
      hotel: hotel._id,
      rooms: rooms,
      checkInDate,
      checkOutDate,
      totalCost,
      status: "pending",
    });

    await newReservation.save();

    return {
      id: newReservation._id.toString(),
      userName: user.name,
      hotel: {
        _id: hotel._id,
        name: hotel.name,
        location: hotel.location,
      },
      checkInDate,
      checkOutDate,
      rooms,
      totalCost,
      pdfPath: "",
      status: "pending",
    };
  }

  async findReservationById(id: string): Promise<IReservationResponse | null> {
    return await Reservation.findOne({ _id: id }, { __v: 0 });
  }

  async findReservations(): Promise<IReservationResponse[]> {
    return await Reservation.find({}, { __v: 0 });
  }

  async deleteReservationById(
    id: string
  ): Promise<IReservationResponse | null> {
    return await Reservation.findByIdAndDelete(id);
  }

  async updateReservationById(
    id: string,
    body: IUpdateReservation
  ): Promise<IReservationResponse | null> {
    return await Reservation.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      projection: { __v: 0 },
    });
  }
}

export default new ReservationRepository();
