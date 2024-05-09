import {
  IDownloadPdf,
  IReservation,
  IReservationResponse,
  IUpdateReservation,
} from "../interfaces/reservation.interface";
import { IHotelsInterfaceRepository } from "../repositories/hotel.repository.interface";
import { IReservationsInterfaceRepository } from "../repositories/reservation.repository.interface";
import { IUsersInterfaceRepository } from "../repositories/user.repository.interface";
import { CalculateCoast } from "../utils/calculateCost";
import { HotelNotFoundError } from "../utils/hotelErrors";
import {
  ReservationNotFoundError,
  ReservationRoomNotAvailableError,
} from "../utils/reservationErrors";
import {
  UserInsufficientFunds,
  UserNotCreatedError,
  UserNotFoundError,
} from "../utils/userErros";
import { IReservationsServiceInterface } from "./reservation.service.interface";

export class ReservationsService implements IReservationsServiceInterface {
  constructor(
    private readonly reservationsRepository: IReservationsInterfaceRepository,
    private readonly hotelsRepository: IHotelsInterfaceRepository,
    private readonly usersRepository: IUsersInterfaceRepository
  ) {}

  async downloadPdf(id: string): Promise<IDownloadPdf> {
    const reservation =
      await this.reservationsRepository.findReservationById(id);

    if (!reservation) throw new ReservationNotFoundError();

    const hotelId = reservation.hotel.toString();

    const hotel = await this.hotelsRepository.findHotelById(hotelId);
    if (!hotel) throw new HotelNotFoundError();

    const roomsReservation = hotel.rooms.filter((room) => {
      if (room._id !== undefined) {
        return reservation.rooms
          .map((roomId) => roomId.toString())
          .includes(room._id.toString());
      }
      return false;
    });

    return {
      userName: reservation.userName,
      hotel: {
        name: hotel.name,
        location: hotel.location,
      },
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      rooms: roomsReservation,
      totalCost: reservation.totalCost,
      pdfPath: reservation.pdfPath,
      status: reservation.status,
    };
  }

  async createReservation(body: IReservation): Promise<IReservationResponse> {
    const { hotelName, userEmail, checkInDate, checkOutDate } = body;

    const hotel = await this.hotelsRepository.findHotelByName(hotelName);
    if (!hotel) throw new HotelNotFoundError();

    const user = await this.usersRepository.findUserByEmail(userEmail);
    if (!user) throw new UserNotFoundError();

    const selectedRooms = hotel.rooms.filter(
      (room) => body.rooms.includes(room.roomNumber) && room.isAvailable
    );

    if (selectedRooms.length !== body.rooms.length)
      throw new ReservationRoomNotAvailableError();

    let totalCost = 0;

    for (const room of selectedRooms) {
      totalCost += CalculateCoast(
        checkInDate,
        checkOutDate,
        room.pricePerNight
      );
    }
    if (user.balance && user.balance < totalCost)
      throw new UserInsufficientFunds();

    const reservation = await this.reservationsRepository.createReservation({
      hotel,
      user,
      checkInDate,
      checkOutDate,
      rooms: selectedRooms,
      totalCost,
    });

    if (!reservation) throw new UserNotCreatedError();

    for (const room of selectedRooms) {
      await this.hotelsRepository.updateRoomsAvailability({
        hotelId: hotel._id || "",
        rooms: room.roomNumber,
        available: false,
      });
    }

    if (user.balance) user.balance -= totalCost;
    if (user._id)
      await this.usersRepository.updateUserById(user._id, {
        balance: user.balance,
      });

    return reservation;
  }
  async uploadPaymentPdf(file: any, id: string): Promise<IReservationResponse> {
    const uploadPaymentPdf = this.reservationsRepository.uploadPaymentPdf(
      file,
      id
    );

    if (!uploadPaymentPdf) throw new ReservationNotFoundError();

    return uploadPaymentPdf;
  }

  async findReservationById(id: string): Promise<IReservationResponse> {
    const reservation =
      await this.reservationsRepository.findReservationById(id);

    if (!reservation) throw new ReservationNotFoundError();

    return reservation;
  }

  async findReservations(): Promise<IReservationResponse[]> {
    const reservations = this.reservationsRepository.findReservations();

    if (!reservations) throw new ReservationNotFoundError();

    return reservations;
  }

  async deleteReservationById(
    id: string
  ): Promise<IReservationResponse | undefined> {
    const hotelDeleted =
      await this.reservationsRepository.deleteReservationById(id);

    if (!hotelDeleted) throw new ReservationNotFoundError();

    return hotelDeleted;
  }
  updateReservationById(
    id: string,
    body: IUpdateReservation
  ): Promise<IReservationResponse | null> {
    if (body.checkInDate || body.checkOutDate) {
    }
    const reservationUpdated =
      this.reservationsRepository.updateReservationById(id, body);

    if (!reservationUpdated) throw new ReservationNotFoundError();

    return reservationUpdated;
  }
}
