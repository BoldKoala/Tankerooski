angular.module('tank.services', [])

.factory('User', function($http, $location, $cookieStore){
  

  //Factory to get all user data for leaderboard
  var getUsers = function(cb){
    $http.get('./api/users')
    .success(function(data){
      cb(data);
    })
    .error(function(error){
      console.log("Error: ", error);
    });
  };

  var user = {};

  user.data = {};

  //Factory to set the current user data
  user.setUserData = function(cb){
    $http.get('/loggedin').success(function(user){
      if (user !== '0'){
        cb(user);
      } else {
        $location.url('/login');
      }
    });
  };

  //Factory to get the current user
  user.getUserData = function(id, cb){
    $http.get('/api/user/' + id).success(function(data){
      if(data){
        cb(data);
      }else{
        $location.url('/login');
      }
    });
  };

  return {
    getUsers:getUsers
  }
})