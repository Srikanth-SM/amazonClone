"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _category = _interopRequireDefault(require("./category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(__filename);
// var mongoose = require('mongoose');
var Schema = _mongoose["default"].Schema;
// var Category = require("./category");
console.log(_category["default"]);
var productSchema = new Schema({
  productName: {
    type: String,
    lowercase: true
  },
  product: {
    type: String,
    lowercase: true // unique:true

  },
  price: {
    type: Number
  },
  category: [{
    type: Schema.Types.ObjectId,
    ref: "Category"
  }],
  imageurl: {
    type: String
  }
});

var Product = _mongoose["default"].model("Product", productSchema);

var _default = {
  Product: Product
};
exports["default"] = _default;