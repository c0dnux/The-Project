const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.get("/", authController.isLoggedIn, viewController.homePage);
router.get(
  "/product/:productId",
  authController.isLoggedIn,
  viewController.overview
);
router.get("/login", viewController.login);
router.get("/signup", viewController.signup);
router.get("/cart", authController.protect, viewController.cart);

module.exports = router;
