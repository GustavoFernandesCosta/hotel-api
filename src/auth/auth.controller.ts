import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/user.repository";

const userRepository = new UserRepository();

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      console.log("login erro");
      throw new Error("E-mail ou senha inválidos");
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      console.log("verify");
      throw new Error("E-mail ou senha inválidos");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "8h",
    });

    return res.json({
      user,
      token,
    });
  }
}
