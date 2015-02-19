// Require dependencies
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var morgan 			 = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session 		 = require('express-session');

// Database configuration
mongoose.connect(process.env.DBURL || 'mongodb://localhost/tankerooski');

// Inject middlewares
app.use(morgan('dev'));   // log every request to the console
app.use(cookieParser());  // read cookies (needed for auth)
app.use(bodyParser());    // get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Configure Passport
require('./config/passport.js')(passport);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
}; 

app.use(session({ secret: 'ilovelouiseslouislouislouis'})); // session secret
app.use(passport.initialize());
app.use(passport.session());  // persistent login sessions

// Configure app with router
require('./config/router.js')(app, express, passport);

module.exports = app;