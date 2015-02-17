angular.module('tank.services', [])
  .factory('User', function($http, $location, $rootScope){


    var u = {};
    var info = {};

    var getUser = function(){
      return u;
    };

    var setUser = function(){
      $http.get('/loggedin').success(function(user){
        if (user !== '0'){
          u = user;
          console.log("inside User.setUser()", u.google);
          moreInfo();

        } else {
          $location.url('/login');
        }
      });
    };

    var moreInfo = function(){
      var url = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + u.google.token;
      $http.get(url)
      .success(function(data){
        info = data;
        console.log("here is more info: ",info);
      }).error(function(err){
        console.log(err);
      })
    }

    return {
      getUser: getUser,
      setUser: setUser,
      moreInfo: moreInfo
    };

  })