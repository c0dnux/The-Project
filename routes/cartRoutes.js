const express = require("express");
const router = express.Router();
const cartController = require("./../controllers/cartController");
const authController = require("./../controllers/authController");
router.post("/add", authController.protect, cartController.addToCart);
module.exports = router;
