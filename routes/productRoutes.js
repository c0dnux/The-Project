const express = require("express");
const productController = require("./../controllers/productController");

const router = express.Router();

router.post("/addProduct", productController.addProduct);
router.delete("/removeProduct", productController.removeProduct);
router.patch("/editProduct/:productId", productController.editProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/:productId", productController.getProduct);
module.exports = router;