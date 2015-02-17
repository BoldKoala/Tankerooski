// client/directives/signin.js

angular.module('tank-directives', [])
  .directive('tpAuth', function(){
    return{
        restrict: 'EA',
        scope: '=',
        replace: true,
        templateUrl: './views/login.html'
    }
  })
  .directive('tankWelcome', function(){
    return{
        restrict: 'EA',
        scope: '=',
        replace: true,
        templateUrl: './views/welcome.html'
    }
  })
  .directive('tankLogin', function(){
    return{
        restrict: 'EA',
        scope: '=',
        replace: true,
        templateUrl: './views/login.html'
    }
  })
  .directive('tankSignup', function(){
    return{
        restrict: 'EA',
        scope: '=',
        replace: true,
        templateUrl: './views/signin.html'
    }
  })
  .directive('tankProfile', function(){
    return {
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: './views/profile.html'
    }
  })