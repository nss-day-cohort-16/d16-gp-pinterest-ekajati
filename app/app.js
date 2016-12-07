"use strict";

var app = angular.module("pinApp", ["ngRoute"]);

let isAuth = function($q, authFactory){
	$q(function(resolve, reject){
		authFactory.isAuthenticated().then(function(user){
			if (user){
				resolve();
			} else{
				reject();
			}
		});
	});
};

app.config(function($routeProvider){
	$routeProvider
	.when("/allPins", {
		templateUrl: "partials/allPins.html",
		controller: "allPinsCtrl"
	})
	.when("/userBoard", {
		templateUrl: "partials/userBoards.html",
		controller: "userBoardsCtrl"		
	})
	.when("/addPin", {
		templateUrl: "partials/addPin.html",
		controller: "addPinCtrl"		
	})
	.when("/userBoard/:boardId", {
		templateUrl: "partials/boardPins.html",
		controller: "BoardPinsCtrl"		
	})
	.when("/login", {
		templateUrl: "partials/login.html",
		controller: "loginCtrl"
	})
	.otherwise("/allPins");
});

app.run(function($location, FBCreds){
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain
	};
	firebase.initializeApp(authConfig);
});