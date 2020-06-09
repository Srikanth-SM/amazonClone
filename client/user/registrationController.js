
angular.module('app')
.controller('RegistrationController',['$scope','$state','UserService',function($scope,$state,UserService){
	console.log("hi");
	$scope.hi = "hi";
	
	//user signin
	$scope.signIn = function(user){
		console.log("Inside SignIn");
		// $state.go("dashboard");
		UserService.signIn(user).then((res)=>{
			$state.go("dashboard");
		}).catch((err)=>{
			$state.go("/")
		});
	}
	$scope.signUp = function(user){
		console.log("signUp");
		$state.go("signUp");
	}
}])
