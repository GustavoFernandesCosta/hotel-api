import { Router } from "express";
import { AuthController } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/auth/login", new AuthController().login);
