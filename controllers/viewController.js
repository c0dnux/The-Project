const Product = require("./../models/productModel");
const catchAsync = require("./../utils/catchAsync");

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
exports.auth = async (req, res, next) => {
  res.status(200).render("auth", {
    title: "overview",
  });
};
