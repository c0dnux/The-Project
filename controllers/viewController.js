const Product = require("./../models/productModel");
const catchAsync = require("./../utils/catchAsync");
const Cart = require("./../models/cartModel");
const Order = require("./../models/orderModel");
exports.homePage = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).render("index", {
    title: "Thread & Trend",
    products,
  });
});
exports.overview = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.status(200).render("overview", {
    title: "overview",
    product,
  });
});
exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "overview",
  });
});
exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render("signup", {
    title: "overview",
  });
});
exports.cart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const myCart = await Cart.findOne({ customer: userId });

  res.status(200).render("cart", {
    title: "cart",
    myCart,
  });
});
exports.payment = catchAsync(async (req, res, next) => {
  res.status(200).render("confirm-payment", {
    title: "payment",
  });
});
exports.orders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ customer: req.user.id });
  res.status(200).render("order", {
    title: "payment",
    orders,
  });
});
