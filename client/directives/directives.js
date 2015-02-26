angular.module('tank.directives', [])
  .directive('tankAuth', function(){
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
  .directive('tankAbout', function(){
    return {
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: './views/about.html'
    }
  })
  .directive('tankInitial', function(){
    return {
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: './views/initial.html'
    }
  })
  .directive('tankLeaderboard', function(){
    return {
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: './views/leaderBoard.html'
    }
  })
  