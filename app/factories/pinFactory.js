"use strict";

app.factory("pinStorage", function($http, FBCreds, $q){
	let pins = [];

	let addPin = function(newPinObj){
		return $q((resolve,reject)=>{
			$http.post(`${FBCreds.databaseURL}/pins.json`, angular.toJson(newPinObj))
			.success((obj)=>{
				resolve(obj);
			})
			.error((error)=>{
				reject(error);
			});
		});
	};

	let getAllPins = function(){
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/pins.json`)
			.success((pinsObj) => {
				let pinCollection = pinsObj;
				let tempArray = [];
				Object.keys(pinCollection).forEach((key) => {
					pinCollection[key].id = key;
					tempArray.push(pinCollection[key]);
					pins = tempArray;
// console.log("pinsObj: ", pinsObj);
				});
				resolve(pins);
			});
		});
	};

	let getUserPinsList = function(user){
		return $q((resolve, reject)=>{
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="uid"&equalTo="${user}" `)
			.success((pinsObj)=>{
				let pinCollection = pinsObj;
				let tempArray = [];
				Object.keys(pinCollection).forEach((key)=>{
					pinCollection[key].id = key;
					tempArray.push(pinCollection[key]);
					pins = tempArray;
				});
				resolve(pins);
			})
			.error((error)=>{
				reject(error);
			});
		});
	};

	let getBoardPins = function(boardId) {
console.log("getBoardPins called with: ", boardId);
		return $q((resolve, reject)=>{
			$http.get(`${FBCreds.databaseURL}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
			.success((pinsObj)=>{
				let pinCollection = pinsObj;
				let tempArr = [];
				Object.keys(pinCollection).forEach((key)=>{
					pinCollection[key].id = key;
					tempArr.push(pinCollection[key]);
					pins = tempArr;
				});
				resolve(pins);
			})
			.error((error)=>{
				reject(error);
			});
		});
	};

	let deletePin = function(pinId){
		return $q((resolve, reject)=>{
			$http.delete(`${FBCreds.databaseURL}/pins/${pinId}`)
			.success((obj)=>{
				resolve(obj);
			})
			.error((error)=>{
				reject(error);
			});
		});
	};

  return {
    getAllPins,
    getUserPinsList,
    getBoardPins
  };
});