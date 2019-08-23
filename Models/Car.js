const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    brand: {type: String,required: true},
    model: {type: String, required: true},
    manaufacturingYear: {type: Date, required: true},
    licensePlate: {type: String, required: true},
    numberOfSeats: {type: Number, required: true},
    //upload len image 
    // CarImage : 
    
});

const Car = mongoose.model("Car", CarSchema, "Car");

module.exports = {
  Car,
  CarSchema
};
