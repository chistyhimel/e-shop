const Product = require("../models/product.model");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      products,
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editing = req.query.edit;
  Product.findById(productId, (product) => {
    res.render("admin/add-product", {
      pageTitle: product.title,
      path: "",
      editing,
      product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product(id, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.postDeleteProduct = (req, res, next) => {
  Product.deleteById(req.body.id);
  res.redirect("/admin/products");
};
