// client/controllers/welcomeController.js

'use strict';

angular.module('tank.main', [])

.controller('MainController', function($scope, $http, $location, $anchorScroll){
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
  };

  $scope.gotoLeaderBoard = function() {
    $location.hash('leaderBoard');
    $anchorScroll();
  };
  $scope.gotoTop = function() {
    $location.hash('top');
    $anchorScroll();
  };
  $scope.gotoBreakingNews = function() {
    $location.hash('breakingNews');
    $anchorScroll();
  };
  $scope.gotoInvasion= function() {
    $location.hash('Invasion');
    $anchorScroll();
  };
  $scope.gotoExtermination = function() {
    $location.hash('extermination');
    $anchorScroll();
  };
  $scope.gotoAbout = function() {
    $location.hash('About');
    $anchorScroll();
  };

})