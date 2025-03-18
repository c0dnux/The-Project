const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: [true, "User can have only one cart."],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        size: { type: Number },
      },
    ],
    totalSum: { type: Number, default: 0 }, // Default to 0
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Middleware to recalculate totalSum before saving
cartSchema.pre("save", async function (next) {
  try {
    // Populate product prices if not already populated
    await this.populate("products.product");

    // Recalculate totalSum
    this.totalSum = this.products.reduce(
      (sum, item) => sum + item.quantity * (item.product?.price || 0),
      0
    );

    next();
  } catch (err) {
    next(err);
  }
});
cartSchema.pre(/^find/, function (next) {
  this.populate("products.product");
  next();
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
