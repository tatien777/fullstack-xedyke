const mongoose = require("mongoose");

const USerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  DOB: { type: Date },
  userType: { type: String, required: true }, // passenger,driver,admin
  phone: { type: String, required: true }, // +84 ...
  registerDate: { type: Date, default: Date.now() },
//   numberOfTrips: {type: Number, required: true},
// numberOfKms
// avarta 
// isActive
});

const User = mongoose.model("User", USerSchema, "User");

module.exports = {
  User,
  USerSchema
};
