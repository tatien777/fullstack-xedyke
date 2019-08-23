const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // why User ?? 
  },
  locationFrom: String,
  locationTo: String,
  startTime: Date,
  availableSeats: Number, // 7 cho = 5 ghe trong + 2tai xe
  fee: Number,
  passengers: [
    {
      passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      numberOfBookingSeats: Number
    }
  ], // [ {userId: 123, numberOfBookingSeats: 3}, {userId: 456, numberOfBookingSeats: 2]
  isFinished: { type: Boolean, default: false }
})

const Trip = mongoose.model("Trip", TripSchema, "Trip");

module.exports = {
  TripSchema, Trip
}




////  tue viet /// 
// const mongoose = require("mongoose");

// const TripSchema = new mongoose.Schema({
//   locationForm: { type: String, required: true },
//   locationTo: { type: String, required: true },
//   startTime: { type: Date, required: true },
//   options: { type: String, required: true },
//   availableSeats: { type: Number, required: true },
//   fee: { type: Number, required: true },
//   // isFinished
//   // passengers
//   // driverId
//   userId: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: "User",
//     required: true
//   }
// });

// const Trip = mongoose.model("Trip", TripSchema, "Trip");

// module.exports = {
//   Trip,
//   TripSchema
// };
