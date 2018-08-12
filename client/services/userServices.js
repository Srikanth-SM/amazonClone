angular.module('app')
.service('UserService', ['$http','$rootScope',function ($http,rootScope) {
	
	this.signIn = function(user) {
		console.log("google",rootScope.config.devUrl);
		return new Promise((resolve,reject)=>{
			$http.post(rootScope.config.devUrl+"signIn",user).then(function(res){
				if(res && res.status == 200){
					resolve(res);
				}
			})
			.catch((err)=>{
				
				reject(err);
			})
		})
		
	}

	this.signUp = function(userDetails){
		console.log("Inside signup");
		return new Promise((resolve,reject)=>{
			$http.post(rootScope.config.devUrl+ 'signUp',userDetails).then((res)=>{
				resolve(res);
			})
			.catch((err)=>{
				reject(err);
			})
		})
	}
}])