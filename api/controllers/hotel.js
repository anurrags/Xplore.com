import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    await newHotel.save();
    res.status(200).json(newHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotel = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 1e9 },
    }).limit(req.query.limit);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  let cities = req.query.cities.split(",");
  for (let i = 0; i < cities.length; i++) {
    cities[i] = cities[i][0].toUpperCase() + cities[i].substring(1);
  }
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const villaCount = await Hotel.countDocuments({ type: "Villa" });
    const cabinCount = await Hotel.countDocuments({ type: "Cabin" });
    res.status(200).json([
      {
        type: "Hotel",
        count: hotelCount,
      },
      {
        type: "Apartment",
        count: apartmentCount,
      },
      {
        type: "Resort",
        count: resortCount,
      },
      {
        type: "Villa",
        count: villaCount,
      },
      {
        type: "Cabin",
        count: cabinCount,
      },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
