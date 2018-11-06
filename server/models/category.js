var {mongoose,Schema} = require('../db/dbConnection');
// var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	name:{
		type:String,
		lowercase:true,
		unique:true
	}
});

module.exports = mongoose.model('Category',categorySchema);