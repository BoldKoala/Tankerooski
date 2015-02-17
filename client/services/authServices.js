angular.module('tank.services', [])
  .factory('User', function(){
    
    var u = {};

    var getUserInfo = function(){
      return u;
    };

    var setUserInfo = function(){
      return $http({
        method: 'GET',
        url: '/api/userInfo'
      }).then(function(resp){
        u = resp.data;
      });
    };

    return {
      getUserInfo: getUserInfo,
      setUserInfo: setUserInfo
    };

  })