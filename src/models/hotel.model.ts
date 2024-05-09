import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({
  id: { type: String },
  roomNumber: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
  roomType: { type: String, required: true },
});

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  rooms: [roomSchema],
});

export const Hotel = mongoose.model("Hotel", hotelSchema);
export const Room = mongoose.model("Room", roomSchema);
