import mongoose from 'mongoose';
import Category from './category';

console.log(__filename);
// var mongoose = require('mongoose');
const { Schema } = mongoose;
// var Category = require("./category");
console.log(Category);

const productSchema = new Schema({
  productName: {
    type: String,
    lowercase: true,
  },
  product: {
    type: String,
    lowercase: true,
    // unique:true
  },
  price: {
    type: Number,
  },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  imageurl: {
    type: String,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
