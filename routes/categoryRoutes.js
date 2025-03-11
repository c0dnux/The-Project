const express = require("express");
const categoryController = require("./../controllers/categoryController");
const router = express.Router();
router.post("/addCategory", categoryController.addCategory);
router.delete("/removeCategory", categoryController.removeCategory);
router.get("/getAllCategories", categoryController.getAllCategories);
module.exports = router;
