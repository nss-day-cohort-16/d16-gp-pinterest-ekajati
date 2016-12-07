"use strict";

// Create FB user when createUser is called

app.factory("userFactory", function ($q, FBCreds, $http) {

  let defaultBoard = {
    title: 'My First Board',
    uid: ""
  };

  let defaultPin = {
    title: "My First pin",
    uid: "",
    url: "http://cdn.playbuzz.com/cdn/154cb38e-55e3-4294-bffe-6906b6a41a6b/266463a7-7772-4711-a494-530fad833319.jpg",
    boardId: ""
  };

  let setUpUser = function (userObj) {
    let newUser = {email: userObj.email, uid: userObj.uid};
    return $q((resolve, reject)=>{
      $http.post(`${FBCreds.databaseURL}/users.json`, angular.toJson(newUser))
      .success((obj)=>{
        createFirstBoard(newUser.uid);
        resolve(obj);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let createFirstBoard = function(currentUser){
    defaultBoard.uid = currentUser;
    return $q((resolve,reject)=>{
      $http.post(`${FBCreds.databaseURL}/boards.json`, angular.toJson(defaultBoard))
      .success((obj)=>{
console.log("createFirstBoard obj: ", obj);
        let boardCollection = obj;
        Object.keys(boardCollection).forEach((key)=>{
          boardCollection[key].boardId = key;
console.log("createFirstBoard boardCollection: ", boardCollection);
        });
        createFirstPin(currentUser, obj.data.name);
        resolve(obj);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  let createFirstPin = function(currentUser, boardId){
    defaultPin.uid = currentUser;
    defaultPin.boardId = boardId;
    return $q((resolve,reject)=>{
      $http.post(`${FBCreds.databaseURL}/pins.json`, angular.toJson(defaultPin))
      .success((obj)=>{
console.log("createFirstPin obj: ", obj);
        let pinCollection = obj;
        Object.keys(pinCollection).forEach((key)=>{
          pinCollection[key].boardId = key;
console.log("createFirstBoard pinCollection: ", pinCollection);
        });
        resolve(obj);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };
 
 return {setUpUser};

});