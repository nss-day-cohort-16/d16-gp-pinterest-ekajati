"use strict";

app.controller("BoardPinsCtrl", function($scope, $routeParams, pinStorage, SearchTermData, AuthFactory){
  //add in filter and auth factories

  $scope.searchText = SearchTermData;
  $scope.selectedBoard = {};

  let user = AuthFactory.getUser();

  pinStorage.getBoardPins($routeParams.boardId)
  .then((pinArray)=>{
    $scope.boardId = $routeParams.boardId;
    $scope.pins = pinArray;
    //no $scope.$apply needed because $q function retrieved data
  });
});