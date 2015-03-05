'use strict';

angular.module('tank.profile',[])
  
.controller('ProfileController', function($scope, $http, User, $stateParams, $rootScope, $cookieStore, $window, $famous){
  
  //Get Famo.us objects
  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  //Set current state to toggle between profile and leaderboard
  var viewState = 'profile';

  //Instantiate Famo.us transitionables
  $scope.profileTransitionable = new Transitionable([0, 0, 0]);
  $scope.angle = new Transitionable(0);

  //Obtain user information stored in cookies
  $scope.user = $cookieStore.get('key').google;
  $scope.player = $cookieStore.get('key').player;
  $scope.tank = $cookieStore.get('key').tank;

  //Rank Calculations
  var killsNeeded = 0;
  if ($scope.player.rank === 1){
    killsNeeded = 10 - $scope.player.kills;
  }
  if ($scope.player.rank === 2){
    killsNeeded = 30 - $scope.player.kills;
  }
  if ($scope.player.rank === 3){
    killsNeeded = 60 - $scope.player.kills;
  }
  if ($scope.player.rank === 4){
    killsNeeded = 100 - $scope.player.kills;
  }
  $scope.nextLevel = " (" + killsNeeded + " Kills to Next Level)";

  if ($scope.player.rank === 5){
    $scope.nextLevel ="Max Level!";
  }

  //Get stars for Tank Operator License
  $scope.stars = [];
  for(var i = 0; i<$scope.player.rank; i++){
    $scope.stars.push(i);
  }

  //Set user id to local storage 
  $window.localStorage.setItem('com.tankerooski.id', $cookieStore.get('key')._id)

  //Fetch all users information
  User.getUsers(function(data){
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
    });

    $scope.sortBy = 'player.kills'
  });


  //Flip Mechanism
  $scope.profileModifier = {
    //translationValues
    size: [1000, 300],
    origin: [0.5,0.5],
    align: [0.5,0.5],
    pointerEvents:'none'
  }

  //Set flip speed
  $scope.flipOptions = {
    duration: 250
  };

  //Flip function for Tank Operator License
  $scope.flipIt = function(view) {
    if(viewState!==view){
      $famous.find('fa-flipper')[0].flip();
      viewState = view;
    }
  };
});
