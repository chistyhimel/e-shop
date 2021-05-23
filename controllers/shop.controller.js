const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: "Shop",
      path: "/",
      products,
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render("shop/product-details", {
      pageTitle: product.title,
      path: "/",
      product,
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      if (cart) {
        for (product of products) {
          const cartProductData = cart.products.find(
            (pd) => pd.productId === product.id
          );
          if (cartProductData) {
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty,
            });
          }
        }
      }

      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.id;
  Product.findById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDelete = (req, res, next) => {
  const productId = req.body.id;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};
