"use strict";

app.controller("loginCtrl", function($scope, authFactory, userFactory, $window){

	authFactory.logoutUser();//automatic logout

	$scope.account = {
		email: "",
		password: ""
	};

	$scope.register = () =>{
		authFactory.createUser($scope.account).then((userData)=>{
			$scope.login();
		});
	};

	$scope.login = () => {
		authFactory.loginUser($scope.account)
		.then((userData)=>{
console.log("loginUserData: ", userData);
			$window.location.href = "#/userBoard";
		});
	};

});