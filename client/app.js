// client/app.js

angular.module('tank', [
  'ui.router',
  'tank-directives',

  ])

// Configure roots for app
.config(function($stateProvider, $httpProvider){
  $stateProvider
  .state('intro',{
    template: 'index.html'
  })
  .state('auth',{
    template: '<tank-auth></tank-auth>',
    controller: 'AuthController'
  })
  .state('welcome', {
    url: '',
    template: '<tank-welcome></tank-welcome>'
    // controller: 'welcomeController'
  })
  .state('login', {
    url: '/login',
    template: '<tank-login></tank-login>'
    // controller: 'loginController'
  })
  .state('signin', {
    url: '/signin',
    template: '<tank-signin></tank-signin>'
    // controller: 'signinController'
  })
})


/* Ultimate goal
Have first page be index.html
  This is the page with the tank that will blow you away
  This will lead to the intro
  Will have a skip intro button
    This escape button will skip to profile page


*/