"use strict";

app.factory("boardFactory", function(authFactory, FBCreds){

	let user = authFactory.getUser();

	let postNewBoard = function($scope.boardObj, FBCreds){
		return $q((resolve, reject)=>{
			$http.post(`${FBCreds.databaseURL}/boards/${$scope.boardObj}.json`)
		}).success(()=>{
			resolve();
		}).error((error)=>{
			reject();
		});
	};
	let getUserBoards = function(FBCreds, user.uid){
		return $q((resolve, reject)=>{
			$http.get(`${FBCreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${user.uid}"`)
		}).success((userBoardObj)=>{
			resolve(userBoardObj);
		}).error((error)=>{
			reject(error);
		});
	};

	return{postNewBoard, getUserBoards};
});