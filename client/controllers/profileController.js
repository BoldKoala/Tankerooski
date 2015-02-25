'use strict';

angular.module('tank.profile',[])
  
.controller('ProfileController', function($scope, $http, User, $stateParams, $rootScope, $cookieStore, $window){
  $scope.user = $cookieStore.get('key').google;
  $scope.player = $cookieStore.get('key').player;
  $scope.tank = $cookieStore.get('key').tank;

  $window.localStorage.setItem('com.tankerooski.id', $cookieStore.get('key')._id)

  $http.get('./api/users').
    success(function(data) {
      data[0].player.kills = 200;
      data[0].player.killed = 300;

      data[1] = {
        google : {
          name : "test"
        },
        player : {
          kills : 100,
          killed : 100
        }
      }
      $scope.players = data;
      $scope.sortBy = 'player.kills'
    }).
    error(function(data) {
      console.log('error', data)
    });




});