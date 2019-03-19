console.log(__filename);
import mongoose from "mongoose";
// var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true
  }
});
var Category = mongoose.model("Category", categorySchema);
export default mongoose.model("Category", categorySchema);
