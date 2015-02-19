'use strict';

angular.module('tank.profile',[])
  
.controller('ProfileController', function($scope, User, $stateParams, $rootScope, $cookieStore){
  $scope.user = $cookieStore.get();
  User.setUser();
  $scope.user = User.getUser();
  console.log("here is $stateParams", $stateParams);


})