"use strict";

app.controller("allPinsCtrl", function($scope, pinStorage){
	//add in filter and auth factories

	pinStorage.getAllPins()
	.then((pinArray)=>{
		$scope.pins = pinArray;
//no $scope.$apply needed because $q function retrieved data
	});

});