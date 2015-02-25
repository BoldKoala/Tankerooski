'use strict';

angular.module('tank.leaderBoard',[])
  
.controller('LeaderBoardController', function($scope, $window, $location, $http){

  $http.get('./api/user/all').
    success(function(data) {
      console.log('successed', data)
    }).
    error(function(data) {
      console.log('error', data)
    });


})