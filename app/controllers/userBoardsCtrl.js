"use strict";

app.controller("userBoardsCtrl", function($scope, boardFactory, authFactory){

	let user = authFactory.getUser();

	// boardFactory.getBoard() //-----> Board Form -> Post -> Get
	// 	.then((boardObj) => {
	// 		$scope.board = boardObj;
	// 		$("#addedBoards").append(`
	// 			<a ng-href="#/boards/{{$scope.board.id}}">
	// 				<div class="col-md-3 boardCards">
	// 					<h3>{{$scope.board.title}}</h3>
	// 				</div>
	// 			</a>
	// 		`);
	// 	});

	boardFactory.getUserBoards(user)
		.then((boardArray)=>{
	console.log("getUserBoards: ", boardArray);
		$scope.boards = boardArray;
		//no $scope.$apply needed because $q function retrieved data
	});

});
		


