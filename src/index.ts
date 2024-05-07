import express from "express";
import { config } from "dotenv";
import { UsersController } from "./users/users.controller";
import { MongoUsersRepository } from "./repositories/mongo-users";

const app = express();

const port = process.env.PORT || 3000;

app.get("/users", async (req, res) => {
  const userRepository = new MongoUsersRepository();
  const usersController = new UsersController(userRepository);
  const { body, statusCode } = await usersController.getAll();

  res.send(body).status(statusCode);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
