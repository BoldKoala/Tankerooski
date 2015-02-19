'use strict';

angular.module('tank.profile',[])
  
.controller('ProfileController', function($scope, $http, User, $stateParams, $rootScope, $cookieStore){
  // $scope.user = $cookieStore.get();
  angular.extend($scope,User);
  $scope.data = {};
  $scope.setUser(function(d){
  	console.log(d);
  	$scope.data.picture = d.picture;
  });
  // $scope.user = User.getUser();
  // console.log("here is $stateParams", $stateParams);

})