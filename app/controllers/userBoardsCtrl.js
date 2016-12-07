"use strict";

app.controller("userBoardsCtrl", function($scope, boardFactory, authFactory){

	let user = authFactory.getUser();

	boardFactory.getUserBoards(user)
		.then((boardArray)=>{
		$scope.boards = boardArray;
//no $scope.$apply needed because $q function retrieved data
	});

});
		


