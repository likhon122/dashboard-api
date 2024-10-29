const express = require("express");
const router = express.Router();

const { price } = require("../controllers/price.controller");

router.get("/:symbol", price);

module.exports = router;