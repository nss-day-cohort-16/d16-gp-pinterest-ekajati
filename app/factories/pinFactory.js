"use strict";

app.factory("pinStorage", function($http, FBCreds, $q){
	let pins = [];

	let getAllPins = ()=>{
		return $q((resolve, reject)=>{
			$http.get(`${FBCreds.databaseURL}/pins.json`)
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

	let getUserPinsList = (user) => {
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

	let getBoardPins = (boardId) => {
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

  return {
    getAllPins,
    getUserPinsList,
    getBoardPins
  };
});