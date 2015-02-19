'use strict';

angular.module('tank.profile',[])
  
.controller('ProfileController', function($scope, User){
  $scope.user = {};
  $scope.picture = "";
  User.setUser();


})