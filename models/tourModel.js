const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A Tour must have a name"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A Tour must have a price"],
  },
});

const Tour = mongoose.model("Tour", TourSchema);

module.exports = Tour;
