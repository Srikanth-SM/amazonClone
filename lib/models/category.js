"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(__filename);
// var mongoose = require('mongoose');
var Schema = _mongoose["default"].Schema;
var categorySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true
  }
});

var Category = _mongoose["default"].model("Category", categorySchema);

var _default = _mongoose["default"].model("Category", categorySchema);

exports["default"] = _default;