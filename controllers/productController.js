const catchAsync = require("./../utils/catchAsync");
const Product = require("./../models/productModel");
const AppErr = require("./../utils/appError");
exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    status: "Success",
    Length: products.length,
    data: products,
  });
});
exports.addProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: "Success",
    data: product,
  });
});

exports.removeProduct = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findByIdAndDelete(productId);
  res.status(200).json({
    status: "Success",
    message: "Product deleted",
    data: product,
  });
});
exports.editProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });
  if (!product) return new AppErr("Update failed", 404);
  res.status(200).json({
    status: "Success",
    message: "Product updated",
    data: product,
  });
});
exports.getProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) return new AppErr("Product not found", 404);
  res.status(200).json({
    status: "Success",
    data: product,
  });
});
