console.log(__filename);
import mongoose from "mongoose";
// var mongoose = require('mongoose');
var Schema = mongoose.Schema;
import Category from "./category";
// var Category = require("./category");
console.log(Category);

var productSchema = new Schema({
  productName: {
    type: String,
    lowercase: true
  },
  product: {
    type: String,
    lowercase: true
    // unique:true
  },
  price: {
    type: Number
  },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  imageurl: {
    type: String
  }
});

var Product = mongoose.model("Product", productSchema);

export default { Product };
