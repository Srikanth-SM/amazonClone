var app = angular.module("app", ['ui.router']);
app.config(function($stateProvider,$urlRouterProvider) {
	console.log($stateProvider);
	$stateProvider
	.state("/", {
		templateUrl : "./user/userRegister.html",
		controller:"RegistrationController",
		// template:'<div>srikanth</div>'
		url:'/'
	})
	.state("signIn", {
		templateUrl : "./user/userRegister.html",
		controller:"RegistrationController",
		// url:'/'
		// template:'<div>srikanth</div>'
	})
	.state("signUp", {
		// templateUrl : "./userRegistration/userRegister.html",
		controller:"signUpController",
		templateUrl:'./user/signup/signup.html',
		url:'/signUp'

	})
	.state("contacts", {
		// templateUrl : "./userRegistration/userRegister.html",
		controller:"RegistrationController",
		template:'<div>srikanth</div>',
		url:'/contacts'

	})
	.state("dashboard", {
		// templateUrl : "./userRegistration/userRegister.html",
		controller:"RegistrationController",
		template:'<div>srikanth</div>',
		url:'/dashboard'

	})
	// .otherwise("/");
	$urlRouterProvider.otherwise("/");
})
.run(function($state,$rootScope){
	$state.go("/");
	$rootScope.config = {
		devUrl:'http://localhost:3000/'
	}
	// $state.go("/");
})
