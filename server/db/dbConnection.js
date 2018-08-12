var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shoppingCart',function(err,success){
	if(!err && success){
		console.log("connection successful");
	}
	else{
		console.log("error",err);
	}
});
var Schema = mongoose.Schema;
// db.disconnect();
module.exports = {
	mongoose,Schema
}