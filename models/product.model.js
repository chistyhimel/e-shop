const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");
const Cart = require("./cart.model");

const filePath = path.join(rootDir, "data", "products.json");

const readDataFromFile = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      return callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    readDataFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (pd) => pd.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString(36).substring(7).toUpperCase();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(productId) {
    readDataFromFile((products) => {
      const product = products.find((pd) => pd.id === productId);
      const updatedProducts = products.filter((pd) => pd.id !== productId);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(productId, product.price);
        }
      });
    });
  }

  static fetchAll(callback) {
    readDataFromFile(callback);
  }

  static findById(productId, callback) {
    readDataFromFile((products) => {
      const product = products.find((pd) => pd.id === productId);
      return callback(product);
    });
  }
};
