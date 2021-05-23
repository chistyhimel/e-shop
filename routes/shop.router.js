const express = require("express");
const {
  getProducts,
  getProductDetails,
  getCart,
  postCart,
  postCartDelete,
} = require("../controllers/shop.controller");

const router = express.Router();

router.get("/", getProducts);

router.get("/products/:productId", getProductDetails);

router.get("/cart", getCart);

router.post("/cart", postCart);

router.post("/cart-delete-item", postCartDelete);

module.exports = router;
