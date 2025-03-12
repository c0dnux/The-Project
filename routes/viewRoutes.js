const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.get("/", authController.isLoggedIn, viewController.homePage);
router.get(
  "/product/:productId",
  authController.protect,
  viewController.overview
);
router.get("/auth", viewController.auth);

module.exports = router;
