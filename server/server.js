// server.js

// Require all tools we will need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/db.js');

// configureation
mongoose.connect(configDB.url);

// set up our express application
app.use(morgan('dev'));   // log eveery request to the console
app.use(cookieParser());  // read cookies (needed for auth)
app.use(bodyParser());    // get information from html forms

app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'ilovelouiseslouislouislouis'})); // session secret
app.use(passport.initialize());
app.use(passport.session());  // persisstent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/router.js')(app, passport);  // load our routes and pass in our app and fully configured passport

// launch
app.listen(port);
console.log('I hear there is a party on port ' + port + '...');