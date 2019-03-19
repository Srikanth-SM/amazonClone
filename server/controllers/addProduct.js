console.log(__filename);

import faker from "faker";
// var faker = require("faker");
import Products from "../models/products";
import Category from "../models/category";
// var Products = require("../models/products");
// var Category = require("../models/category");

var productsLength = 30;

var category = new Category();
category.name = faker.commerce.department();
// category.save(cb);

function cb() {
  for (var i = 0; i < productsLength; i++) {
    var product = new Products();
    product.productName = faker.commerce.productName() + "" + i;
    product.product = faker.commerce.product();
    product.imageurl = faker.image.image();
    product.price = faker.commerce.price();
    product.category.push(category._id);
    product.save();
  }
}

var get = function(req, res, next) {
  Products.find(function(err, results) {
    if (err && !!results) {
      return res.send(err);
    } else {
      return res.send(results);
      console.log("products displayed");
    }
  });
};
var getProduct = function(req, res, next) {
  var id = req.params.id;
  Products.findById(id, function(err, results) {
    if (err && !!results) {
      return res.send(err);
    } else {
      return res.send(results);
      console.log("product displayed");
    }
  });
};

export default {
  get,
  getProduct
};
