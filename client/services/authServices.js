angular.module('tank.services', [])

.factory('User', function($http, $location, $cookieStore){
  var user = {};

  user.data = {};

  user.setUser = function(cb){
    $http.get('/loggedin').success(function(user){
      if (user !== '0'){
        cb(user);
      } else {
        $location.url('/login');
      }
    });
  };

  return user;
})