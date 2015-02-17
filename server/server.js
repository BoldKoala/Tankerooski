// server/server.js

// Require all tools we will need
var express = require('express');
var app = express();
var port = process.env.PORT || 9000;
var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/db.js');

// configureation
mongoose.connect(configDB.url);

require('./config/passport.js')(passport);

// set up our express application
app.use(morgan('dev'));   // log eveery request to the console
app.use(cookieParser());  // read cookies (needed for auth)
app.use(bodyParser());    // get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//app.set('view engine', 'ejs');
// required for passport
app.use(session({ secret: 'ilovelouiseslouislouislouis'})); // session secret
app.use(passport.initialize());
app.use(passport.session());  // persisstent login sessions

require('./config/router.js')(app, passport);  // load our routes and pass in our app and fully configured passport

// launch
app.listen(port);
console.log('I hear there is a party on port ' + port + '...');