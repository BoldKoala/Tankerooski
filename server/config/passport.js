// Require dependencies;
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;

// load the auth variables
var authKey = {
  'clientID'      : process.env.CLIENTID || require('./local.env.js').googleAuth.clientID,
  'clientSecret'  : process.env.CLIENTSECRET || require('./local.env.js').googleAuth.clientSecret,
  'callbackURL'   : process.env.CALLBACK || 'http://localhost:9000/auth/google/callback'
};

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
  passport.use(new GoogleStrategy(authKey, function(token, refreshToken, profile, done){
    process.nextTick(function(){
       UserController.signin(profile, done, token)
    });
  }));
};












