module.exports = function(app, express, passport){
  //=====================================
  // HOME PAGE
  // ====================================
  // console.log("this is dirname", __dirname);
  var UserController  = require('../controllers/userController.js');
  var cookieParser = require('cookie-parser');
  app.use(cookieParser());
  app.use(express.static(__dirname+'/../../client'));

  app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // Logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  //Google Oauth
  app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']//['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile']
  }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    // successRedirect: '/#/profile',
    // failureRedirect: '/'
  }), function(req, res, profile){

    var user = req.user;
    res.cookie('key', JSON.stringify(user));
    res.redirect('/#/profile');

  });

  app.get('/api/users', UserController.getAllPlayer );

  app.get('/api/user/:id', function(req, res){
    if(req.isAuthenticated()){
      UserController.getPlayerData(req, res, req.params.id);
    }else{
      res.redirect('/');
    }
  });  

  app.get('/game',function(req,res){
    res.redirect('/game/index.html');
  })

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




























