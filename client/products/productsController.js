
angular.module('app')
.controller('ProductsController',['$scope','$state','ProductService','$stateParams',function($scope,$state,productService,$stateParams){
	console.log("Inside ProductsController");
	
	productService.getAllProducts()
	.then(function(res){
		$scope.products = res;
		console.log($scope.products);
		$scope.a="srinath"
	})
	.catch(function(err){
		console.log(err);
		$scope.products = err;
	})

	$scope.findProduct = function(id){
		console.log($stateParams);
		console.log("findProduct "+id);
		
		productService.getProductById(id)
		.then(function(res){
			$scope.product = res.data;
			$state.go("product",{productId:id});
		})
		.catch(function(err){
			$scope.product = err;
		})
	}
}])