const Product = require("./../models/productModel");
const catchAsync = require("./../utils/catchAsync");

exports.homePage = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).render("index", {
    title: "Home",
    products,
  });
});
