const catchAsync = require("./../utils/catchAsync");
const Category = require("./../models/categoryModel");
const AppErr = require("./../utils/appError");
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "Success",
    Length: categories.length,
    data: categories,
  });
});
exports.addCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);
  if (!category) return next(new AppErr("Error creating Category", 404));
  res.status(201).json({
    status: "Success",
    data: category,
  });
});
exports.removeCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.body;
  const category = await Category.findByIdAndDelete(categoryId);
  res.status(200).json({
    status: "Success",
    message: "Category deleted",
    data: category,
  });
});
