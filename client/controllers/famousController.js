'use strict';

angular.module('tank.famous',[])
  
.controller('FamousController', function($scope, $state, $window, $location, User, $http, $famous){
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];
  var Surface = $famous['famous/core/Surface'];
  var View = $famous['famous/core/View'];
  var Transform = $famous['famous/core/Transform'];
  var ImageSurface = $famous['famous/surfaces/ImageSurface'];

  // $scope.introTransitionable = new Transitionable([0, 0, 0]);
  //$scope.angle = new Transitionable(0);
  $scope.opacityState = new Transitionable(1);
  $scope.opacityClear = new Transitionable(0);
  $scope.appear = new Transitionable();

  $scope.opacityOut = function() {
    $scope.opacityState.set(0, {duration: 5000}, function(){
      $state.go('welcome');
    });
  };

  $scope.opacityIn = function() {
    $scope.opacityClear.set(1)
  }

  $scope.turrentRotate = function() {
    $scope.appear.set();
  }



  $scope.introModifier = {
    // translateValues: [50, 100, 0],
    size: [window.innerWidth, window.innerHeight],
    origin: [0.5,0.5],
    align: [0.5,0.5]
  };

  $scope.enterModifier = {
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
    // translationValues
>>>>>>> progress on enter button
    size: [284, 100],
=======
    size: [446, 284],
>>>>>>> progress on enter button
=======
    size: [486, 290],
    origin: [0.5,0.5],
    align: [0.5,0.5],
    cursor: 'pointer'
  }

  $scope.tankModifier = {
    size: [446, 157],
>>>>>>> working on gettin gif to show
    origin: [0.5,0.5],
    align: [0.5,0.5]
  }

  // This does not work, returns 404
  $scope.tankImage = {
    imageStill: '../assets/images/tankStill.jpg'
  }
  
  $scope.turrentView = new View();

  var _tankSurface = new ImageSurface({
    size: [446, 157],
    origin: [0.5,0.5],
    align: [0.5,0.5]
  });
  _tankSurface.setContent('./assets/images/tankStill.jpg');

  $scope.tankBlast = function() {
    console.log("tank blast!")
    // Create new surface with tank gif
    var tankGif = new ImageSurface ({
      // size: [446, 157],
      // origin: [0.5,0.5],
      // align: [0.5,0.5],
      content: './assets/images/tankTurrent.gif'
    });

  }



});