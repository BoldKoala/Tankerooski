// server/config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User = require('../models/userModel.js');

// load the auth variables
var configAuth = require('./local.env.js')

// expose this function to our app using module.exports
module.exports = function(passport) {
  // passport session setup

  // required for persistent login sessions
  // passport needs ability to serialize and unserialize userso out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Google
  passport.use(new GoogleStrategy({
          clientID        : configAuth.googleAuth.clientID,
          clientSecret    : configAuth.googleAuth.clientSecret,
          callbackURL     : configAuth.googleAuth.callbackURL,
      },
      function(token, refreshToken, profile, done) {
          // make the code asynchronous
          // User.findOne won't fire until we have all our data back from Google
          process.nextTick(function() {
              // try to find the user based on their google id
              User.findOne({ 'google.id' : profile.id }, function(err, user) {
                  if (err)
                      return done(err);
                  if (user) {
                      // if a user is found, log them in
                      console.log(user);
                      return done(null, user);
                  } else {
                      // if the user isnt in our database, create a new user
                      var newUser          = new User();
                      // set all of the relevant information
                      newUser.google.id    = profile.id;
                      newUser.google.token = token;
                      newUser.google.name  = profile.displayName;
                      newUser.google.email = profile.emails[0].value; // pull the first email
                      // save the user
                      newUser.save(function(err) {
                          if (err)
                              throw err;
                          return done(null, newUser);
                      });
                  }
              });
          });

      }));

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done){
    // callback with email and password from our form
    // find a user whose email is the same as the forms email we are checking to see if the user trying to login already exists
    User.findOne({'local.email': email}, function(err, user){
      //if there are any errors, return the error
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }
      if(!user.validPassword(password)){
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

        //set the users'
      }
      return done(null, user);
    });
    
  }));

  // Local signup

  // we are using named strategies sice we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    password: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the passReqToCallback
  },
  function(req, email, password, done) {
    // asynchronous
    // User.findOne won't fire unless data is sent back
    process.nextTick(function(){
      // find a user whos email is the same as the forms email
      // we are checking to see if the user tring to login already exists
      User.findOne({ 'local.email' : email }, function(err, user) {
        // if there are any errors, returnt he error
        if (err)
          return done(err);

        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          // if there is not user with that email create the user
          var newUser = new User();

          // set the user's local credentials
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          // save the user
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
};

// // Google passport setup
// passport.use(new GoogleStrategy({
//   consumerKey: GOOGLE_CONSUMER_KEY,
//   consumerSecret: GOOGLE_CONSUMER_SECRET,
//   callbackURL: "http://127.0.0.1:9000"
//   },
//     function(token, tokenSecret, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//     }
// ));










