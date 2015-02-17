'use strict';

angular.module('tank.profile',[])
  
  .controller('ProfileController', function($scope, User){
    User.setUser();


  })