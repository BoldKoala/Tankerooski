// Require dependencies;
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;

// load the auth variables
var configAuth      = require('./local.env.js')

// Require database model
var User            = require('../models/userModel.js');
var UserController  = require('../controllers/userController.js');

module.exports = function(passport) {
  // === Setup Passport Session ===
  // Passport needs to serialize and unserialize users for persistent login sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
  // Login user with Google OAuth
  passport.use(new GoogleStrategy(configAuth.googleAuth, function(token, refreshToken, profile, done){
    process.nextTick(function(){
       UserController.signin(profile, done, token)
    });
  }));
};












