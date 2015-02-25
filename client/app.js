angular.module('tank', [
  'ui.router',
  'tank.directives',
  'tank.services',
  'tank.profile',
  'tank.welcome',
  'tank.auth',
  'tank.leaderBoard',
  'ngResource',
  'ngCookies',
  'angular-parallax',
  'scrollto'
  ])

// Configure roots for app
.config(function($stateProvider, $httpProvider){
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<tank-login></tank-login>',
      controller: 'AuthController'
    })
    .state('signin', {
      url: '/signin',
      template: '<tank-signin></tank-signin>'
    })
    .state('profile', {
      url:'/profile',
      template: '<tank-profile></tank-profile>',
      controller: 'ProfileController'
    })
    .state('leaderBoard', {
      url:'/leaderBoard',
      template: '<tank-leader-board></tank-leader-board>',
      controller: 'LeaderBoardController'
    })
    .state('welcome', {
      url: '',
      template: '<tank-welcome></tank-welcome>'
    })
    .state('about',{
      url: '/about',
      template: '<tank-about></tank-about>'
    })
  
  $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens',function($window){
  //Attaches a JWT on every server request.
  var attach = {
    request: function(object){
      // var jwt = $window.localStorage.getItem('com.triumpet.token');
      // if(jwt){
      //   object.headers['x-access-token'] = jwt;
      // }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})


/* Ultimate goal
Have first page be index.html
  This is the page with the tank that will blow you away
  This will lead to the intro
  Will have a skip intro button
    This escape button will skip to profile page


*/