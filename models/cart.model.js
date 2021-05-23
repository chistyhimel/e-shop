const path = require("path");
const fs = require("fs");

const rootDir = require("../utils/path");
const filePath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(productId, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (pd) => pd.productId === productId
      );
      console.log(existingProductIndex);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { productId, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(productId, price) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(
        (pd) => pd.productId === productId
      );
      if (product) {
        const productQty = product.qty;
        updatedCart.products = updatedCart.products.filter(
          (pd) => pd.productId !== productId
        );
        updatedCart.totalPrice = updatedCart.totalPrice - price * productQty;

        fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
          console.log(err);
        });
      }
    });
  }

  static getCart(callback) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        callback(null);
      } else {
        const cart = JSON.parse(fileContent);
        callback(cart);
      }
    });
  }
};
