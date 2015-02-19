// Require database model
var User = require('../models/userModel.js');

var UserController = {};

UserController.signin = function(profile, done, token) {
	// Login user with Google OAuth
  console.log("this is profile: ", profile); 
  console.log("this is token: ", token);
	User.findOne({'google.id': profile.id}, function(err, user) {
    if(err){
      return done(err);
    }
    if(user) {
      // found user update token
      user.token = token;
      user.save(function(err,user, num){
        if(err){
          console.log('error saving token');
        }
      })
      return done(null, user);
    } else {
      // Create user if not found
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