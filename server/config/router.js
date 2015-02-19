module.exports = function(app, express, passport){
  //=====================================
  // HOME PAGE
  // ====================================
  // console.log("this is dirname", __dirname);
  //var UserController  = require('../controllers/userController.js');
  app.use(express.static(__dirname+'/../../client'));

  app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user.google : '0');
  });

  // Logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/login',function(req,res){
    res.redirect('/auth/google');
  })

  //Google Oauth
  app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']//['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile']
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/#/profile',
    failureRedirect: '/'
  }), function(req, res, profile){
    console.log("this is req", req.user.google);
    // res.cookie('user', req.user.google);
    // res.redirect('/#/profile');
    res.send(req.user.google);
  });

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


























