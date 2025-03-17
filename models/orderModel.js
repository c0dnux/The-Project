const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  reference: { type: String, required: [true, "Reference is required"] },
  createdAt: { type: Date, default: Date.now },
});
orderSchema.pre(/^find/, function (next) {
  this.populate("products.product");
  next();
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
