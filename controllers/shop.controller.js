const Product = require("../models/product.model");

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "Shop",
      path: "/",
      products,
    });
  });
};
