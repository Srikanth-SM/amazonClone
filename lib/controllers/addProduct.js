"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _faker = _interopRequireDefault(require("faker"));

var _products = _interopRequireDefault(require("../models/products"));

var _category = _interopRequireDefault(require("../models/category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(__filename);
// var Products = require("../models/products");
// var Category = require("../models/category");
var productsLength = 30;
var category = new _category["default"]();
category.name = _faker["default"].commerce.department(); // category.save(cb);

function cb() {
  for (var i = 0; i < productsLength; i++) {
    var product = new _products["default"]();
    product.productName = _faker["default"].commerce.productName() + "" + i;
    product.product = _faker["default"].commerce.product();
    product.imageurl = _faker["default"].image.image();
    product.price = _faker["default"].commerce.price();
    product.category.push(category._id);
    product.save();
  }
}

var get = function get(req, res, next) {
  _products["default"].find(function (err, results) {
    if (err && !!results) {
      return res.send(err);
    } else {
      return res.send(results);
      console.log("products displayed");
    }
  });
};

var getProduct = function getProduct(req, res, next) {
  var id = req.params.id;

  _products["default"].findById(id, function (err, results) {
    if (err && !!results) {
      return res.send(err);
    } else {
      return res.send(results);
      console.log("product displayed");
    }
  });
};

var _default = {
  get: get,
  getProduct: getProduct
};
exports["default"] = _default;