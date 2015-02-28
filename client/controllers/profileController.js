'use strict';

angular.module('tank.profile',[])
  
.controller('ProfileController', function($scope, $http, User, $stateParams, $rootScope, $cookieStore, $window, $famous){
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];
  var viewState = 'profile';

  $scope.profileTransitionable = new Transitionable([0, 0, 0]);
  $scope.angle = new Transitionable(0);


  $scope.user = $cookieStore.get('key').google;
  $scope.player = $cookieStore.get('key').player;
  $scope.tank = $cookieStore.get('key').tank;

  $window.localStorage.setItem('com.tankerooski.id', $cookieStore.get('key')._id)

  $http.get('./api/users').
    success(function(data){
      $scope.players = data;
      $scope.players.forEach(function(player){
        player.kdratio = player.player.kills/player.player.killed;
        if(typeof player.kdratio !== 'number' || player.player.kills === 0){
          player.kdratio = 0;
        }
        if(!player.player.onTarget){
          player.player.onTarget = 0;
        }
        if(!player.player.fired){
          player.player.fired = 0;
        }
        player.accuracy = player.player.onTarget/player.player.fired;
        if(typeof player.accuracy !== 'number' || player.player.onTarget === 0){
          player.accuracy = 0;
        }
      })


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

    $scope.flipIt = function(view) {
      if(viewState!==view){
        $famous.find('fa-flipper')[0].flip();
        viewState = view;
      }
    };

});