// Require all the things!
var User = require('../models/userModel.js');

var UserController = {};

UserController.getPlayerData = function (req, res, id) {
  User.findOne({'google.id' : id}, function (err, user) {
    if (err){
     return next(err);
   }
    res.send(user);
  });
};

UserController.getAllPlayer = function (req, res, next) {
  User.find({}, function (err, data) {
    if (err){
     return next(err);
    } else {
      res.send(data);
    }
  });
};

UserController.signin = function(profile, done, token) {
	User.findOne({'google.id': profile.id}, function(err, user) {
    if(err){
      return done(err);
    }
    if(user) {
      // found user update token
      user.google.token      = token;
      user.google.email      = profile._json.email;
      user.google.name       = profile._json.name;
      user.google.givenName  = profile._json.given_name;
      user.google.familyName = profile._json.family_name;
      user.google.picture    = profile._json.picture;
      user.google.locale     = profile._json.locale;
      user.google.link       = profile._json.link;

      //======== Tank Level System
      if (user.player.kills >= 0){
        user.player.rank = 1;
        user.rank = 'Private';
      }
      if (user.player.kills >= 10){
        user.player.rank = 2;
        user.rank = 'Sergeant';
      }
      if (user.player.kills >= 30){
        user.player.rank = 3;
        user.rank = 'Captain';
      }
      if (user.player.kills >= 60){
        user.player.rank = 4;
        user.rank = 'Major';
      }
      if (user.player.kills >= 100){
        user.player.rank = 5;
        user.rank = 'General';
      }

      user.tank.speed        = user.player.rank === 5 ? 1.2 : 0.1 + (user.player.rank - 1) * 0.004;
      user.tank.HP           = user.player.rank === 5 ? 20 : 10 + (user.player.rank - 1) * 2;
      user.tank.bulletFreq   = user.player.rank === 5 ? 1200 : 2000 - (user.player.rank - 1) * 160;

      user.save(function(err, user, num){
        if(err){
          console.log('error saving token');
        }
      })
      return done(null, user);
    } else {
      // Create user if not found
      var d = new Date();
      var n = d.toString();
      var newUser               = new User();
      newUser.google.id         = profile._json.id;
      newUser.google.token      = token;
      newUser.google.email      = profile._json.email;
      newUser.google.name       = profile._json.name;
      newUser.google.givenName  = profile._json.given_name;
      newUser.google.familyName = profile._json.family_name;
      newUser.google.picture    = profile._json.picture;
      newUser.google.locale     = profile._json.locale;
      newUser.google.link       = profile._json.link;
      newUser.player.kills      = 0;
      newUser.player.killed     = 0;
      newUser.player.fired      = 0;
      newUser.player.onTarget   = 0;
      newUser.tank.speed        = 0.1;
      newUser.tank.damage       = 1;
      newUser.tank.HP           = 10;
      newUser.tank.bulletFreq   = 2000;
      newUser.player.date       = n;
      newUser.player.firstDate  = "Maybe a little wine and some grecco-roman wrestling, wherever the night takes us...";
      newUser.save(function(err) {
        if (err){
          return done(new Error(err));
        }
        return done(null, newUser);
      });
    }
  });
}

module.exports = UserController;















