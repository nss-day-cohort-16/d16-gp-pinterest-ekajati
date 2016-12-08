"use strict";

app.factory("authFactory", function($q, userFactory){
	let currentUser = null;
console.log("currentUser1: ", currentUser);
	let createUser = function(userObj){
		return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
			.then(function(userObj){
				userFactory.setUpUser(userObj);
			});
	};

	let loginUser = function(userObj){
console.log("currentUser2: ", currentUser);
		return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password);
	};

	let logoutUser = function(){
		return firebase.auth().signOut();
	};

	let getUser = function(){
console.log("currentUser3: ", currentUser);
		return currentUser;
	};

	let isAuthenticated = function(){
console.log("currentUser4: ", currentUser);
		return $q((resolve, reject)=>{
			firebase.auth().onAuthStateChanged((user)=>{
				if (user){
					currentUser = user.uid;
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	};

	return {createUser, loginUser, logoutUser, getUser, isAuthenticated};
});