import { Router } from "express";
import { HotelsController } from "../controllers/hotel.controller";
import { HotelsService } from "../services/hotel.service";
import { HotelRepository } from "../repositories/hotel.repository";
import { authMiddleware } from "../middlewares/auth.middleware";

const hotelRoute = Router();

const hotelRepository = new HotelRepository();
const hotelService = new HotelsService(hotelRepository);
const hotelController = new HotelsController(hotelService);

hotelRoute.use(authMiddleware);

hotelRoute.get("/hotels", async (req, res) => {
  const response = await hotelController.findHotels();

  res.send(response.body).status(response.statusCode);
});

hotelRoute.get("/hotels/:id", async (req, res) => {
  const response = await hotelController.findHotelById(req.params.id);

  res.send(response.body).status(response.statusCode);
});

hotelRoute.post("/hotels", async (req, res) => {
  const { body } = req;

  const response = await hotelController.createHotel(body);

  res.send(response.body).status(response.statusCode);
});

hotelRoute.put("/hotels/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const response = await hotelController.updateHotelById(id, body);

  res.send(response.body).status(response.statusCode);
});

hotelRoute.delete("/hotels/:id", async (req, res) => {
  const { id } = req.params;

  const response = await hotelController.deleteHotelById(id);

  res.send(response.body).status(response.statusCode);
});

export default hotelRoute;
