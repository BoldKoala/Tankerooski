// Require database model
var User = require('../models/userModel.js');

var UserController = {};

UserController.signin = function(profile,done) {
	// Login user with Google OAuth
	User.findOne({'google.id': profile.id}, function(err, user) {
    if(err){
      return done(err);
    }
    if(user) {
      // Log in user if found
      return done(null, user);
    } else {
      // Create user if not found
      var newUser          = new User();
      newUser.google.id    = profile.id;
      newUser.google.token = token;
      newUser.google.name  = profile.displayName;
      newUser.google.email = profile.emails[0].value;
      newUser.save(function(err) {
        if (err){
          done(new Error(err));
        }
        done(null, newUser);
      });
    }
  });
}


module.exports = UserController;