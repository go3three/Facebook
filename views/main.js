'use strict';

var fs = require('fs');
var utils = require('../app/utils.js');
var index = fs.readFileSync(__dirname + '/../views/index.html');
var profile = fs.readFileSync(__dirname + '/../views/profile.html');

module.exports = function(req, res) {

  var cookies = utils.parseCookies(req.headers.cookie);

  if(!cookies.firstName || !cookies.username || !cookies.lastName) {
    res.writeHead(401);
    return res.end(index);
  }

  res.end(profile);
};
