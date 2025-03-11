const catchAsync = require("./../utils/catchAsync");
const Cart = require("./../models/Cart");

exports.addToCart = catchAsync(async (req, res, next) => {
  const { customerId, productId, quantity } = req.body;
  let cart = await Cart.findOne({ customer: customerId });

  if (!cart) {
    cart = new Cart({ customer: customerId, products: [] });
  }

  const existingProduct = cart.products.find(
    (p) => p.product.toString() === productId
  );
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
});

exports.getCart = catchAsync(async (req, res, next) => {
  const { customerId } = req.body;
  const cart = await Cart.findOne({ customer: customerId }).populate(
    "products.product"
  );

  res.status(200).json({
    status: "Success",
    data: cart,
  });
});
exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { customerId, productId } = req.body;

  const cart = await Cart.findOne({ customer: customerId });

  // Find the index of the product in the cart
  const productIndex = cart.products.findIndex(
    (p) => p.product.toString() === productId
  );

  if (productIndex === -1) {
    return res.status(404).json({
      status: "Fail",
      message: "Product not found in cart",
    });
  }

  // Remove the product from the array
  cart.products.splice(productIndex, 1);

  await cart.save();

  return res.status(200).json({
    status: "Success",
    message: "Product removed from cart",
    data: cart,
  });
});
