angular.module('app')

.controller('signUpController',['$scope','$state','UserService',function($scope,$state,UserService){
	console.log("hi");
	$scope.hi = "hi";
	
	//user signin
	$scope.signUp = function(user){
		console.log("Inside SignUp");
		// $state.go("dashboard");
		UserService.signUp(user).then((res)=>{
			console.log(res);
			if(res && res.status==200){
				console.log("details saved successfully",res);
				$state.go("/");
			}
			else{
				
			}
		}).catch((err)=>{
			console.log("details not saved successfully",err);
			$state.go("/")
		});
	}

	
}])