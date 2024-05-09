import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes";
import mongoose from "mongoose";
import hotelRoute from "./routes/hotel.routes";
import reservationRoute from "./routes/reservation.routes";
// import { authRoutes } from "./auth/auth.routes";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  // app.use(authRoutes);

  app.use(userRoutes);
  app.use(hotelRoute);
  app.use(reservationRoute);

  const mongoPassword = process.env.MONGODB_PASSWORD;
  const mongoUser = process.env.MONGODB_USERNAME;

  const mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@localhost:27017/hotel-api?authSource=admin`;

  await mongoose
    .connect(mongoUrl)
    .then(() => console.log("Connected to MongoDB"));

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

main();
