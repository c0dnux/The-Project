const catchAsync = require("./../utils/catchAsync");
const Cart = require("./../models/cartModel");
const AppError = require("./../utils/appError");
const Product = require("./../models/productModel");
exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const size = Number(req.body.size);
  const quantity = Number(req.body.quantity); // Ensure quantity is a number
  const customerId = req.user.id;

  if (!customerId || !productId || quantity <= 0 || isNaN(quantity)) {
    return next(new AppError("Invalid input data", 400));
  }

  // Ensure productId is a valid ObjectId and fetch product details
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // Check if requested quantity exceeds available stock
  if (quantity > product.stock) {
    return next(
      new AppError("Requested quantity exceeds available stock", 400)
    );
  }

  // Find or create the cart for the customer
  let cart = await Cart.findOne({ customer: customerId }).populate(
    "products.product"
  );

  if (!cart) {
    cart = new Cart({
      customer: customerId,
      products: [{ product: productId, size, quantity }],
    });
  } else {
    // Find existing product in cart
    const existingProduct = cart.products.find((p) =>
      p.product._id.equals(productId)
    );

    if (existingProduct) {
      // Ensure new quantity does not exceed stock
      const newQuantity = existingProduct.quantity + quantity;
      if (newQuantity > product.stock) {
        return next(new AppError("Cannot add more than available stock", 400));
      }

      existingProduct.quantity = newQuantity;
    } else {
      cart.products.push({ product: productId, size, quantity });
    }
  }

  // Save the cart (totalSum updates via pre-save middleware)
  await cart.save();

  res.status(200).json({
    status: "Success",
    message: "Product added to cart",
    cart,
  });
});
exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const customerId = req.user.id;

  const cart = await Cart.findOne({ customer: customerId });

  if (!cart) return new AppError("Cart not found", 404);

  // Remove the product from the cart
  cart.products = cart.products.filter(
    (item) => item.product.id.toString() !== productId
  );

  // Save the updated cart
  await cart.save();

  res
    .status(200)
    .json({ status: "Success", message: "Product removed from cart", cart });
});
exports.getOne = catchAsync(async (req, res, next) => {
  const { cartId } = req.params;
  console.log(cartId);

  const cart = await Cart.findOne({ customer: cartId });
  console.log(cart);

  if (!cart) return new AppError("No cart found", 400);
  res
    .status(200)
    .json({ status: "Success", message: "Carrt gotten", data: cart });
});
