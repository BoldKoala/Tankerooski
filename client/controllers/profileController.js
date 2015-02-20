'use strict';

angular.module('tank.profile',[])
  
.controller('ProfileController', function($scope, $http, User, $stateParams, $rootScope, $cookieStore){
  $scope.user = $cookieStore.get('key').google;
  $scope.player = $cookieStore.get('key').player;
  $scope.tank = $cookieStore.get('key').tank;

  // angular.extend($scope,User);
  // $scope.setUser(function(user){
  // 	$scope.user  = user.google;
  //   $scope.tank  = user.tank;
  //   $scope.player= user.player;

  // });




});