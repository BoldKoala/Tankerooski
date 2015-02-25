// client/controllers/welcomeController.js

'use strict';

angular.module('tank.welcome', [])

.controller('WelcomeController', function($scope, $http, $location, $anchorScroll){
  $http.get('./api/users').
    success(function(data){
      $scope.players = data;
      $scope.sortBy = 'player.kills';
    }).
    error(function(data) {
      console.log('error', data)
    });

    $scope.gotoRebellion = function() {
      $location.hash('rebellion');
      $anchorScroll();
    }

})