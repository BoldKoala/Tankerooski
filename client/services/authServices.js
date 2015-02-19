angular.module('tank.services', [])

.factory('User', function($http, $location, $cookieStore){

  //console.log("this is cookiestore: ", $cookieStore.get('user'));

  var u = {};
  var info = {};

  var getUser = function(){
    return u;
  };

  var setUser = function(){
    $http.get('/loggedin').success(function(user){
      if (user !== '0'){
        u = user;
        console.log("inside User.setUser()", u);
      } else {
        $location.url('/login');
      }
    });

  };


  return {
    getUser: getUser,
    setUser: setUser
  };
})