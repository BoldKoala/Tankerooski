angular.module('tank.directives', [])
  // .directive('tankAuth', function(){
  //   return{
  //     restrict: 'EA',
  //     scope: '=',
  //     replace: true,
  //     templateUrl: './views/login.html'
  //   }
  // })
  .directive('tankMain', function(){
    return{
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: './newviews/main.html'
    }
  })
  .directive('tankNavbar', function(){
    return{
      restrict: 'EA',
      scope: '=',
      replace: true,
      templateUrl: './newviews/navbar.html'
    }
  })  
  .directive('tankHome', function(){
    return{
      restrict: 'EA',
      scope: '=',
      templateUrl: './newviews/home.html'
    }
  })
  .directive('tankControl', function(){
    return{
      restrict: 'EA',
      templateUrl: './newviews/control.html'
    }
  })
  .directive('tankStacks', function(){
    return{
      restrict: 'EA',
      templateUrl: './newviews/stack.html'
    }
  })
  .directive('tankTeam', function(){
    return{
      restrict: 'EA',
      templateUrl: './newviews/team.html'
    }
  })
  // .directive('tankLogin', function(){
  //   return{
  //     restrict: 'EA',
  //     scope: '=',
  //     replace: true,
  //     templateUrl: './views/loginshtml'
  //   }
  // })
  // .directive('tankSignup', function(){
  //   return{
  //     restrict: 'EA',
  //     scope: '=',
  //     replace: true,
  //     templateUrl: './views/signin.html'
  //   }
  // })
  // .directive('tankProfile', function(){
  //   return {
  //     restrict: 'EA',
  //     scope: '=',
  //     replace: true,
  //     templateUrl: './views/profile.html'
  //   }
  // })  
  // .directive('tankAbout', function(){
  //   return {
  //     restrict: 'EA',
  //     scope: '=',
  //     replace: true,
  //     templateUrl: './views/about.html'
  //   }
  // })
  // .directive('tankInitial', function(){
  //   return {
  //     restrict: 'EA',
  //     scope: '=',
  //     replace: true,
  //     templateUrl: './views/initial.html'
  //   }
  // })
  // .directive('tankLeaderboard', function(){
  //   return {
  //     restrict: 'EA',
  //     scope: '=',
  //     replace: true,
  //     templateUrl: './views/leaderBoard.html'
  //   }
  // })
  