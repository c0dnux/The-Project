const catchAsync = require("./../utils/catchAsync");
const Order = require("./../models/orderModel");
const Cart = require("./../models/cartModel");
const Product = require("./../models/productModel");
const axios = require("axios");
const AppError = require("./../utils/appError");
exports.makeOrder = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const customerId = req.user.id;
  const cart = await Cart.findOne({ customer: customerId });
  const reference = `order_${req.user.id}_${Date.now()}_${cart.id}`;

  for (const item of cart.products) {
    const product = await Product.findOne({ _id: item.product.id });
    if (!product)
      return next(
        new AppError(`Product ${item.product.name} not available`, 404)
      );

    if (product.stock < item.quantity) {
      return next(
        new AppError(
          `Requested quantity for ${product.name} exceeds available stock`,
          400
        )
      );
    }
  }
  const deliveryFee = 1500;
  // 2) Create checkout session

  const paystackResponse = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    {
      email: req.user.email,
      amount: (cart.totalSum + deliveryFee) * 100, // Convert to kobo (Naira subunit)
      currency: "NGN",
      reference,
      callback_url: `${req.protocol}://${req.get(
        "host"
      )}/confirm-payment?reference=${reference}`,

      metadata: {
        customer: req.user.id,
        products: cart.products,
        totalSum: cart.totalSum + deliveryFee, // Convert to kobo (Naira subunit)
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  // 3) Create session as response
  res.status(200).json({
    status: "success",

    checkoutUrl: paystackResponse.data.data.authorization_url, // Redirect user here
  });
});

exports.paymentConfirmation = catchAsync(async (req, res, next) => {
  const { reference } = req.query; // Get reference from the query string
  if (!reference) {
    return next(new AppError(`Payment failed Missing reference`, 404));
  }
  const existingorder = await Order.findOne({ reference });

  if (existingorder) {
    return next(new AppError(`Payment already recorded`, 200));
  }
  // 🔹 Verify the transaction with Paystack
  const response = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );
  if (response.data.data.status !== "success")
    return next(new AppError("Payment verification failed", 400));

  const { metadata, reference: verifiedRef, paid_at } = response.data.data;

  // ✅ Payment is successful, save booking in the database
  const order = await Order.create({
    customer: metadata.customer,
    products: metadata.products,
    totalAmount: metadata.totalSum, // Convert back to Naira
    reference: verifiedRef,
    paymentStatus: "paid",
    createdAt: paid_at, // Save payment time
  });
  if (order) {
    await Cart.findOneAndDelete({ customer: metadata.customer });

    for (const item of metadata.products) {
      const product = await Product.findById(item.product._id);
      if (!product) continue; // 🔹 Skip if product no longer exists

      // ✅ Decrement stock safely
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -item.quantity },
      });
    }
  }
  return res.status(200).json({
    status: "success",
    message: "Payment successful",
    reference: verifiedRef,

    createdAt: paid_at,
  });
});
