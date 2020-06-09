angular.module('app')
.service('ProductService', ['$http','$rootScope',function ($http,rootScope) {
	
	this.getAllProducts= function(){
		return new Promise(function(resolve,reject){
			$http.get(rootScope.config.devUrl+"allProducts").then(function(res){
				console.log(res);
				resolve(res);
			})
			.catch(function(err){
				console.log(err);
				 reject(err);
			})
			// resolve({});
		})
		
	}

	this.getProductById = function(id){
		return new Promise(function(resolve,reject){
			$http.get(rootScope.config.devUrl+"product/"+id).then(function(res){
				console.log(res);
				resolve(res);
			})
			.catch(function(err){
				console.log(err);
				reject(err);
			})
		})
	}
}])