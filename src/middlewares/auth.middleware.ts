import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";

type JwtPayload = {
  id: string;
};

const userRepository = new UserRepository();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("Não autorizado");

    throw new Error("Não autorizado");
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

  const user = await userRepository.findUserById(id);

  if (!user) {
    console.log("Não autorizado");
    throw new Error("Não autorizado");
  }

  next();
};
