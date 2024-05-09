import mongoose from "mongoose";

const { Schema } = mongoose;

const reservationSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  ],
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  pdfPath: {
    type: String,
    default: null,
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
