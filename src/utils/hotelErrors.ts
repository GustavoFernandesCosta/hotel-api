import { CustomError } from "./customErrors";

export class HotelAlreadyExistsError extends CustomError {
  constructor() {
    super(409, "Hotel já cadastrado com esse nome");
  }
}

export class HotelNotCreatedError extends CustomError {
  constructor() {
    super(500, "Hotel não foi criado");
  }
}

export class HotelNotFoundError extends CustomError {
  constructor() {
    super(404, "Hotel não encontrado");
  }
}

export class HotelNotUpdatedError extends CustomError {
  constructor() {
    super(500, "Hotel não foi atualizado");
  }
}
