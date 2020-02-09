import mongoose from 'mongoose';

console.log(__filename);
// var mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
  },
});
const Category = mongoose.model('Category', categorySchema);
export default mongoose.model('Category', categorySchema);
