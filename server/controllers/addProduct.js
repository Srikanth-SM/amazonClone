var faker = require('faker');

var Products = require("../models/products");
var Category = require("../models/category");

var productsLength = 30;

var category = new Category();
	category.name = faker.commerce.department();
	category.save(cb);

	function cb(){
	for(var i=0;i<productsLength;i++){
	
		var product = new Products();
		product.productName = faker.commerce.productName()+""+i;
		product.product = faker.commerce.product()
		product.imageurl = faker.image.image();
		product.price = faker.commerce.price();
		product.category.push(category._id);
		product.save();
	}
}

module.exports.get = function(req,res,next){
	Products.find(function(err,results){
		if(err&& !!results){
			return res.send(err);
		}
		else{
			return res.send(results);
			console.log("products displayed");
		}
	})
}
module.exports.getProduct = function(req,res,next){
	var id = req.params.id;
	Products.findById(id,function(err,results){
		if(err&& !!results){
			return res.send(err);
		}
		else{
			return res.send(results);
			console.log("product displayed");
		}
	})
}
