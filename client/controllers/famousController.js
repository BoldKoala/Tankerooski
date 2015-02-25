'use strict';

angular.module('tank.famous',[])
  
.controller('FamousController', function($scope, $state, $window, $location, User, $http, $famous){
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing']

  // $scope.introTransitionable = new Transitionable([0, 0, 0]);
  //$scope.angle = new Transitionable(0);
  $scope.opacityState = new Transitionable(1);

  $scope.opacityOut = function() {
    console.log("inside opacityOut");
    $scope.opacityState.set(0, {duration: 5000}, function(){
      $state.go('welcome');
    });


  };

  $scope.introModifier = {
    // translateValues: [50, 100, 0],
    size: [window.innerWidth, window.innerHeight],
    origin: [0.5,0.5],
    align: [0.5,0.5]
  };

  $scope.enterModifier = {
<<<<<<< HEAD
=======
<<<<<<< HEAD
    // translationValues
>>>>>>> progress on enter button
    size: [284, 100],
=======
    size: [446, 284],
>>>>>>> progress on enter button
    origin: [0.5,0.5],
    align: [0.5,0.5]
  }


});