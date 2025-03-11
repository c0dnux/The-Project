const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const TextileSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  price: { type: Number, required: [true, "Price is required"] }, // Price per unit (e.g., per yard)
  color: { type: String, required: [true, "Color is required"] },
  image: String, // URL of the textile image
  availableStock: {
    type: Number,
    required: [true, "Available stock is required"],
  },
});

const Textile = mongoose.model("Textile", TextileSchema);
module.exports = Textile;
