"use strict";

app.controller("userBoardsCtrl", function($scope, boardStorage, boardFactory){


	boardFactory.getBoard() //-----> Board Form -> Post -> Get
		.then((boardObj) => {
			$scope.board = boardObj;
		$("#addedBoards").append(`	
			<a ng-href="#/boards/{{$scope.board.id}}">
				<div class="col-md-3 boardCards">
					<h3>{{$scope.board.title}}</h3>
				</div>
			</a>
		`);
	});

	boardStorage.getUserBoards()
		.then((boardArray)=>{
		$scope.boards = boardArray;
		//no $scope.$apply needed because $q function retrieved data
	});
});
		


