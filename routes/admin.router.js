const express = require("express");
const {
  getAddProduct,
  postAddProduct,
} = require("../controllers/admin.controller");

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

module.exports = router;
