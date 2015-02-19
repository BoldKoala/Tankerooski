'use strict';

var path = require('path');
var _ = require('lodash');

var all = {
  env: process.env.NODE_ENV,

  root: path.normalize(__dirname + '/../../..')
}