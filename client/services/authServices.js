angular.module('tank.services', [])

.factory('User', function($http, $location, $cookieStore){

  //console.log("this is cookiestore: ", $cookieStore.get('user'));

  var user = {};
  // var info = {};

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