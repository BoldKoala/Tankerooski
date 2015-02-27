'use strict';

angular.module('tank.leaderBoard',[])
  
.controller('LeaderboardController', function($scope, $window, $location, $http){

    $http.get('./api/users').
      success(function(data){
        $scope.players = data;
        $scope.sortBy = 'player.kills';
      }).
      error(function(data) {
        console.log('error', data)
      });

});