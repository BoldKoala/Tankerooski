'use strict';

angular.module('tank.profile',[])
  
.controller('ProfileController', function($scope, $http, User, $stateParams, $rootScope, $cookieStore){
  angular.extend($scope,User);
  $scope.setUser(function(user){
  	$scope.data = user;
  });
})