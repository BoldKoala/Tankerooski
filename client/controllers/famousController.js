'use strict';

angular.module('tank.famous',[])
  
.controller('FamousController', function($scope, $state, $window, $location, User, $http, $famous){
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing']

  $scope.introTransitionable = new Transitionable([0, 0, 0]);
  $scope.angle = new Transitionable(0);

  $scope.animate = function() {
    $scope.introTransitionable.set([0, 0, 0], {duration: 1000, curve: Easing['outElastic']});
    console.log("should translate");
    $scope.angle.set(2*Math.PI, {
      duration: 4000,
      curve: 'easeInOut'
    });
  };

  // Creates a
  $scope.databound = {
    content: "change me!!"
  }
  $scope.introModifier = {
    // translateValues: [50, 100, 0],
    size: [window.innerWidth, window.innerHeight],
    origin: [0.5,0.5],
    align: [0.5,0.5]
  };

  $scope.flipIt = function(cb) {
    $famous.find('fa-flipper')[0].flip(null, cb);

    setTimeout((function(){console.log("inside the callback");
    $state.go('welcome')}), 4000);
  };

  $scope.flipOptions = {
    duration: 3000
  };
  
  var cb = function() {
    
  };



});