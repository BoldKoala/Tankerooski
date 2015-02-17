// server/config/router.js

var express = require('express');
//Create router here
module.exports = function(app, passport){
  //=====================================
  // HOME PAGE
  // ====================================
  // console.log("this is dirname", __dirname);
  app.use(express.static(__dirname+'/../../client'));

  // Home page
  // app.get('/', function(req, res) {
  //   res.sendfile('client/index.html');  // Load the index.html file
  // });

  app.get('/signup', function(req, res) {
    // render the signup page
    // res.redirect('views/signup.html');
  });
  app.get('/login', function(req, res) {
    // render the signup page
    // req.flash('message', {'success': 'Sign Up Success'});
    // res.redirect('views/login.html');
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to our secure profiel page
    failureRedirect: '/login',
    failureFlash :true // allow flash messages
  }));

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the lgoin page if there is an error
    failureFlash: true // allow flash messages
  }));

  // Profile section
  app.get('/profile', isLoggedIn, function(req, res){
    res.redirect('views/profile.html'), {
      user: req.user // get the user out of session and pass to template
    };
  });
  
  // Logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));
};

// route middleware to make sure user is logged in
function isLoggedIn(req, res, next){
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}

// Google authenticate requests
// app.get('/auth/google',
//   passport.authenticate('google', { scope: 'https://www.google.com/m8.feeds' }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // successful authentication, redirect home
//     res.redirect('/');
//   });
























