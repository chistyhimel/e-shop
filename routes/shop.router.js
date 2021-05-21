const express = require("express");
const { getProducts } = require("../controllers/shop.controller");

const router = express.Router();

router.get("/", getProducts);

module.exports = router;
