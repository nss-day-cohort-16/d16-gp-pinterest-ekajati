"use strict";

app.controller("userBoardsCtrl", function($scope, boardFactory, authFactory, userFactory){

	let user = authFactory.getUser();

	boardFactory.getUserBoards(user)
		.then((boardArray)=>{
console.log("userBoardsCtrl: ", boardArray);
		$scope.boards = boardArray;
//no $scope.$apply needed because $q function retrieved data
	});

  $scope.deleteBoard = function (event) {
console.log("delete event: ", $(event.target).closest('.boardCard').attr("id"));
    let boardId = $(event.target).closest('.boardCard').attr("id");
    boardFactory.deleteBoard(boardId).
    then((obj)=>{
      $(`#${boardId}`).remove();
    });
  };

});
		


