"use strict";

app.controller("userBoardsCtrl", function($scope, boardFactory, authFactory, userFactory){

	let user = authFactory.getUser();

	boardFactory.getUserBoards(user)
		.then((boardArray)=>{
console.log("userBoardsCtrl: ", boardArray);
		$scope.boards = boardArray;
//no $scope.$apply needed because $q function retrieved data
	});

});
		


