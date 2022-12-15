import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photo: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: [String],
    max: 5,
    min: 4,
  },
  rooms: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("Hotel", HotelSchema);
