const express = require("express");
const viewController = require("./../controllers/viewController");
const router = express.Router();

router.get("/", viewController.homePage);
module.exports = router;
