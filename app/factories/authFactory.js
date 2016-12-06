"use strict";

app.factory("authFactory", function($q){
	let currentUser = null;

	let createUser = function(userObj){
		return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password);
	};

	let loginUser = function(userObj){
		return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password);
	};

	let logoutUser = function(){
		return firebase.auth().signOut();
	};

	let getUser = function(){
		return currentUser;
	};

	let isAuthenticated = function(){
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