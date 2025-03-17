const express = require("express");
const router = express.Router();
const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");

router.post("/makeOrder", authController.protect, orderController.makeOrder);
router.post(
  "/confirmation",
  authController.protect,
  orderController.paymentConfirmation
);

module.exports = router;
