"use strict";

app.controller("boardViewCtrl", function($scope, boardFactory, authFactory, $location){
	//Would we need user data here to pass into the function below?
	let user = authFactory.getUser();

	//idea here is to create an object that we can pass off to the http call to post the new board
	$scope.boardObj = {
		title: "",
		uid: user.uid
	}; 

	//this would get called when the button on boardView is clicked
	$scope.createBoard = function($scope.boardObj){
		boardFactory.postNewBoard($scope.boardObj).then((response)=>{
			$location.url("#/boards") //can change this to reflect actual URL we'll use. 
			//do we need $scope.$apply here?
		});	
	};

});