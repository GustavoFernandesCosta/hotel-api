import { Router } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UsersController } from "../controllers/user.controller";
// import { authMiddleware } from "../middlewares/auth.middleware";

const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UsersController(userService);

// userRoutes.use(authMiddleware);

userRoutes.get("/users", async (req, res) => {
  const response = await userController.findUsers();

  res.send(response.body).status(response.statusCode);
});

userRoutes.get("/users/:id", async (req, res) => {
  const response = await userController.findUserById(req.params.id);

  res.send(response.body).status(response.statusCode);
});

userRoutes.post("/users", async (req, res) => {
  const { body } = req;

  const response = await userController.createUser(body);

  res.send(response.body).status(response.statusCode);
});

userRoutes.put("/users/:id", async (req, res) => {
  const { body } = req;

  const response = await userController.updateUserById(body, req.params.id);

  res.send(response.body).status(response.statusCode);
});

userRoutes.delete("/users/:id", async (req, res) => {
  const response = await userController.deleteUserById(req.params.id);

  res.send(response.body).status(response.statusCode);
});

export default userRoutes;
