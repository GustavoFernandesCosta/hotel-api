import { CustomError } from "./customErrors";

export class UserAlreadyExistsError extends CustomError {
  constructor() {
    super(409, "Usuário já cadastrado com esse email");
  }
}

export class UserNotCreatedError extends CustomError {
  constructor() {
    super(500, "Usuário não foi criado");
  }
}

export class UserNotFoundError extends CustomError {
  constructor() {
    super(404, "Usuário não encontrado");
  }
}

export class UserNotUpdatedError extends CustomError {
  constructor() {
    super(500, "Usuário não foi atualizado");
  }
}

export class UserInsufficientFunds extends CustomError {
  constructor() {
    super(400, "Saldo insuficiente");
  }
}
