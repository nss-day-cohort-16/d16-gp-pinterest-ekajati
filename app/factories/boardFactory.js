"use strict";

app.factory("boardFactory", function($http, authFactory, FBCreds, boardViewCtrl, $q){

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
		return $q((resolve, reject)=>{
			$http.get(`${FBCreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${user}"`)
			.success((userBoardObj)=>{
				let boardCollection = userBoardObj;
				let tempArr = [];
				Object.keys(boardCollection).forEach((key)=>{
				  boardCollection[key].id = key;
				  tempArr.push(boardCollection[key]);
				  boards = tempArr;
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