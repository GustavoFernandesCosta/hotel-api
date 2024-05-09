import { CustomError } from "./customErrors";

export class ReservationRoomNotAvailableError extends CustomError {
  constructor() {
    super(400, "Um ou mais quartos não estão disponíveis");
  }
}

export class ReservationNotCreatedError extends CustomError {
  constructor() {
    super(500, "Reserva não foi criado");
  }
}

export class ReservationNotFoundError extends CustomError {
  constructor() {
    super(404, "Reserva não encontrado");
  }
}

export class ReservationNotUpdatedError extends CustomError {
  constructor() {
    super(500, "Reserva não foi atualizado");
  }
}
