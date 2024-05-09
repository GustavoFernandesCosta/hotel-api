import { Router, response } from "express";
import { ReservationsController } from "../controllers/reservation.controller";
import { ReservationRepository } from "../repositories/reservation.repository";
import { ReservationsService } from "../services/reservation.service";
import upload from "../config/multer";
import { HotelRepository } from "../repositories/hotel.repository";
import { UserRepository } from "../repositories/user.repository";
import puppeteer, { PaperFormat } from "puppeteer";
import path from "path";
import ejs from "ejs";
import { authMiddleware } from "../middlewares/auth.middleware";

const reservationRoute = Router();

const reservationRepository = new ReservationRepository();
const hotelsRepository = new HotelRepository();
const usersRepository = new UserRepository();

const reservationService = new ReservationsService(
  reservationRepository,
  hotelsRepository,
  usersRepository
);
const reservationController = new ReservationsController(reservationService);

const filePath = path.join(__dirname, "../utils/generatePdf/print.ejs");

reservationRoute.use(authMiddleware);

reservationRoute.get("/reservations/pdf/:id", async (req, res) => {
  const { id } = req.params;
  const reservationData = await reservationController.downloadPdf(id);

  try {
    const html = await ejs.renderFile(filePath, {
      reservationData,
    });

    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfOptions = {
      path: "src/public/reservas/reserva.pdf",
      format: "A4" as PaperFormat,
      printBackground: true,
    };

    await page.pdf(pdfOptions);

    await browser.close();

    res.sendFile(path.resolve("src/public/reservas/reserva.pdf"));
  } catch (error) {
    console.error("Erro ao gerar o PDF:", error);
    res.status(500).send("Erro ao gerar o PDF");
  }
});

reservationRoute.post(
  "/reservations/:id/upload-payment",
  upload.single("file"),
  async (req, res) => {
    const { file } = req;
    const { id } = req.params;
    const response = await reservationController.uploadPaymentPdf(file, id);

    res.send(response.body).status(response.statusCode);
  }
);

reservationRoute.get("/reservations/:id", async (req, res) => {
  const { id } = req.params;
  const response = await reservationController.findReservationById(id);

  res.send(response.body).status(response.statusCode);
});

reservationRoute.get("/reservations", async (req, res) => {
  const response = await reservationController.findReservations();

  res.send(response.body).status(response.statusCode);
});

reservationRoute.post("/reservations", async (req, res) => {
  const { body } = req;

  const response = await reservationController.createReservation(body);

  res.send(response.body).status(response.statusCode);
});

reservationRoute.put("/reservations/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const response = await reservationController.updateReservationById(id, body);

  res.send(response.body).status(response.statusCode);
});

reservationRoute.delete("/reservations/:id", async (req, res) => {
  const { id } = req.params;
  const response = await reservationController.deleteReservationById(id);

  res.send(response.body).status(response.statusCode);
});

export default reservationRoute;
