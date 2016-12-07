"use strict";

app.factory("boardFactory", function($http, authFactory, FBCreds, $q){
  authFactory.isAuthenticated();
console.log("isAuthenticated: ", authFactory.isAuthenticated());
	let user = authFactory.getUser();
	let boards = [];

	let postNewBoard = function(boardObj){
		return $q((resolve, reject)=>{
			$http.post(`${FBCreds.databaseURL}/boards.json`, angular.toJson(boardObj))
			.success(()=>{
console.log("Posted!: ", boardObj);
				resolve();
			})
			.error((error)=>{
				reject(error);
			});
		});
	};
	
	let getUserBoards = function(user){
console.log("user: ", authFactory.getUser());
console.log("api request: ", `${FBCreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${user}"`);
		return $q((resolve, reject)=>{
			$http.get(`${FBCreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${user}"`)
			.success((userBoardObj)=>{
console.log("getUserBoardObj: ", userBoardObj);
				let boardCollection = userBoardObj;
				let tempArr = [];
				Object.keys(boardCollection).forEach((key)=>{
				  boardCollection[key].boardId = key;
				  tempArr.push(boardCollection[key]);
				  boards = tempArr;
console.log("getUserBoards: ", boards);
				});
					resolve(boards);
			})
			.error((error)=>{
				reject(error);
			});
		});
	};

	return{postNewBoard, getUserBoards};
});