angular.module('tank', [
  'ui.router',
  'tank.directives',
  'tank.services',
  'tank.profile',
  'tank.welcome',
  'tank.auth'
  ])

// Configure roots for app
.config(function($stateProvider){
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
  })
  .state('login', {
    url: '/login',
    template: '<tank-login></tank-login>'
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
})


/* Ultimate goal
Have first page be index.html
  This is the page with the tank that will blow you away
  This will lead to the intro
  Will have a skip intro button
    This escape button will skip to profile page


*/