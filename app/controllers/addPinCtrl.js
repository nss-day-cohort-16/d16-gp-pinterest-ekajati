"use strict";

app.controller("addPinCtrl", function($scope, authFactory) {
      //add in filter and auth factories

      $scope.title = "Add a new pin";
      $scope.btnText = "Save new pin";

      $scope.addNewPin = {
        description: "",
        url: "",
        board: "",
        uid: authFactory.loginUser
      };

      $scope.addNewPin = function() {
        console.log("you clicked on Save new pin:", $scope.addNewPin);

      };
    });
