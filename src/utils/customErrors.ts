export class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export const DefaultError = {
  statusCode: 500,
  body: "Something went wrong!",
};
