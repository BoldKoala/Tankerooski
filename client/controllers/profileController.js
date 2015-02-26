'use strict';

angular.module('tank.profile',[])
  
.controller('ProfileController', function($scope, $http, User, $stateParams, $rootScope, $cookieStore, $window, $famous){
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];
  $scope.profileTransitionable = new Transitionable([0, 0, 0]);
  $scope.angle = new Transitionable(0);


  $scope.user = $cookieStore.get('key').google;
  $scope.player = $cookieStore.get('key').player;
  $scope.tank = $cookieStore.get('key').tank;

  $window.localStorage.setItem('com.tankerooski.id', $cookieStore.get('key')._id)

  $http.get('./api/users').
    success(function(data){
      $scope.players = data;
      $scope.sortBy = 'player.kills'
    }).
    error(function(data) {
      console.log('error', data)
    });

    $scope.profileModifier = {
      //translationValues
      size: [1000, 300],
      origin: [0.5,0.5],
      align: [0.5,0.5],
      pointerEvents:'none'
    }

    $scope.flipOptions = {
      duration: 250
    };

    $scope.flipIt = function(cb) {
      $famous.find('fa-flipper')[0].flip();

      // setTimeout((function(){console.log("inside the callback");
      // $state.go('welcome')}), 4000);
    };
    $scope.goto = function(link){
      console.log('hello');
    }

});