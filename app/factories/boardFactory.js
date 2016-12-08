"use strict";

app.factory("boardFactory", function($http, authFactory, FBCreds, $q){

	let user = authFactory.getUser();
	let boards = [];
	let lastKnownBoard = {};

	let postNewBoard = function(boardObj){
		return $q((resolve, reject)=>{
			$http.post(`${FBCreds.databaseURL}/boards.json`, angular.toJson(boardObj))
			.success(()=>{
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
				  boardCollection[key].boardId = key;
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

	let getBoard = function(boardId){
		return $q((resolve, reject) =>{
			$http.get(`${FBCreds.databaseURL}/boards/${boardId}.json`)
			.success((boardObj)=>{
				lastKnownBoard = boardObj;
				resolve(lastKnownBoard);
			})
			.error((error)=>{
				reject(error);
			});
		});
	};

	let deleteBoard = function(boardId){
		return $q((resolve, reject)=>{
			$http.delete(`${FBCreds.databaseURL}/boards/${boardId}`)
			.success((obj)=>{
				resolve(obj);
			})
			.error((error)=>{
				reject(error);
			});
		});
	};

	return{postNewBoard, getUserBoards, getBoard};
});