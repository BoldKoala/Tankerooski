angular.module('tank', [
  'ui.router',
  'tank.directives',
  'tank.services',
  'tank.profile',
  'tank.main',
  'ngCookies',
  'tank-parallax',
  'famous.angular',
  ])

// Configure roots for app
.config(function($stateProvider, $httpProvider){
  $stateProvider
    .state('profile', {
      url:'/profile',
      template: '<tank-profile></tank-profile>',
      controller: 'ProfileController'
    })
    .state('main', {
      template: '<tank-main></tank-main>',
      controller: 'MainController'
    })
    .state('main.welcome', {
      url:'',
      template: '<tank-home></tank-home><tank-control></tank-control><tank-stacks></tank-stacks><tank-team><tank-team>'
    })

  $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens',function($window){
  //Attaches a JWT on every server request.
  var attach = {
    request: function(object){
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})