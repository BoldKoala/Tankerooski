angular.module('tank.services', [])

.factory('User', function($http, $location, $cookieStore){
  var user = {};

  user.data = {};

  user.setUser = function(cb){
    $http.get('/loggedin').success(function(user){
      if (user !== '0'){
        console.log("this is inside setUser: ", user);
        cb(user);
      } else {
        $location.url('/login');
      }
    });
  };

  user.getGameData = function(id, cb){
    $http.get('/api/user/' + id).success(function(data){
      if(data){
        console.log(data);
        cb(data);
      }else{
        $location.url('/login');
      }
    });
  };

  return user;
})