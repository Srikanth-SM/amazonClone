var bcrypt = require('bcrypt-nodejs');


var {mongoose,Schema} = require('../db/dbConnection');
// var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var UserSchema = new Schema({
	email:{
		type:'string',
		lowercase: true,
		unique:true
	},
	address:{
		type:'string',
	},
	profile:{
		name:{
			type:'string',
			lowercase:true,
			default:''
		},
		picture:{
			type:'string',
			default:''
		}
	},
	name:String,
	password:{
		type:String
	}
	
	
})

var tankSchema = new Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', tankSchema);


UserSchema.pre('save',function(next){
	// console.log('save',this);
	// console.log(this);
	var user = this;
	// console.log(user.isModified());
	// console.log(bcrypt);
	if(!user.isModified("password"))
		return next();
		bcrypt.hash(user.password,null,null,function(err,res){
		
		// console.log(res);
		user.password = res;
		next();
	});
	

})

UserSchema.methods.comparePassword = function(password){
	var user = this;
	var bool = bcrypt.compareSync(password,this.password);
	console.log(bool);
	return bool;
	
}

var User = mongoose.model('User',UserSchema);
var Tank = mongoose.model('Tank',tankSchema);

module.exports = {
	User:User
}

