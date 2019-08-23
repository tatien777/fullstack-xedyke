const mongoose = require("mongoose");
const CarSchema = require("./Car");
const DriverSchema = new mongoose.Schema({
  //userId
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  address: { type: String, required: true },
  passportId: { type: String, required: true },
  mainJob: { type: String },
  // embediding
  carInfo: { type: CarSchema }
  //   passengerRates: {type: Number}
});

const Driver = mongoose.model("Driver", DriverSchema, "Driver");

module.exports = {
  Driver,
  DriverSchema
};
