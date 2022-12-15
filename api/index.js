import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./router/auth.js";
import hotelRoute from "./router/hotel.js";
import userRoute from "./router/user.js";
import roomRoute from "./router/room.js";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Database");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/user", userRoute);
app.use("/api/rooms", roomRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Listening on port localhost:${process.env.PORT}`);
});
