"use strict";

app.controller("userBoardsCtrl", function($scope, boardFactory, authFactory, userFactory, $location){

	let user = authFactory.getUser();

	boardFactory.getUserBoards(user)
		.then((boardArray)=>{
console.log("userBoardsCtrl: ", boardArray);
		$scope.boards = boardArray;
//no $scope.$apply needed because $q function retrieved data
	});

  $scope.deleteBoard = function (boardId) {
console.log("delete boardId: ", boardId);
    boardFactory.deleteBoard(boardId);
    $(`#${boardId}`).remove();
    $location.url('/userBoard');
  };

});
		


