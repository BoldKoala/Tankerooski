angular.module('tank.directives', [])
  .directive('tankMain', function(){
    return{
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: './views/main.html'
    }
  })
  .directive('tankNavbar', function(){
    return{
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: './views/navbar.html'
    }
  })  
  .directive('tankHome', function(){
    return{
      restrict: 'EA',
      scope: '=',
      templateUrl: './views/home.html'
    }
  })
  .directive('tankControl', function(){
    return{
      restrict: 'EA',
      templateUrl: './views/control.html'
    }
  })
  .directive('tankStacks', function(){
    return{
      restrict: 'EA',
      templateUrl: './views/stack.html'
    }
  })
  .directive('tankTeam', function(){
    return{
      restrict: 'EA',
      templateUrl: './views/team.html'
    }
  })
  .directive('tankProfile', function(){
    return {
      restrict: 'EA',
      scope: '=',
      templateUrl: './views/profile.html'
    }
  })
  .directive('tankLeaderboard', function(){
    return {
      restrict: 'EA',
      scope: '=',
      templateUrl: './views/leaderBoard.html'
    }
  })
  