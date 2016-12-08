"use strict";

app.controller("addPinCtrl", function($scope, authFactory, $location, pinStorage, boardFactory) {

  let user = authFactory.getUser();
  $scope.title = "Add a new pin";
  $scope.btnText = "Save new pin";
  $scope.newPin = {
    description: "",
    url: "",
    boardId: "",
    uid: user
  };

console.log("addPin user: ", user);

  boardFactory.getUserBoards(user)
  .then((boardObj)=>{
console.log("boardObj: ", boardObj);
    $scope.boards = boardObj;
  });

  $scope.update = function (board) {
  console.log("selectedBoard: ", board);
    $scope.newPin.boardId = board.id;
  };

  $scope.addNewPin = function() {
console.log("createNewPin from: ", $scope.newPin);
    pinStorage.addPin($scope.newPin)
    .then((obj)=>{
      $scope.newPin = {
        description: "",
        url: "",
      };
      $location.url('#/board/:$scope.newPin.boardId');
    });
console.log("you clicked on Save new pin:", $scope.newPin);
  };
});
