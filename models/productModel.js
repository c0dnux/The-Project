const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  description: { type: String },
  price: { type: Number, required: [true, "Please insert price"] },
  image: { type: String, required: [true, "Image is required"] }, // Array of image URLs
  stock: { type: Number, default: 0 },
  sizes: [{ type: String }], // For shoes, caps, etc.
  color: { type: String, required: [true, "Please insert color"] },
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});
productSchema.pre("save", function (next) {
  this.slug = this.name.split(" ").join("-").toLowerCase();
  next();
});
productSchema.pre(/^find/, function (next) {
  this.populate("category");
  next();
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
