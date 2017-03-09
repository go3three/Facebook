'use strict';

var fs = require('fs');
var utils = require('../app/utils.js');
var index = fs.readFileSync(__dirname + '/../views/index.html');
var profile = fs.readFileSync(__dirname + '/../views/profile.html','utf8');

module.exports = function(req, res) {

  var cookies = utils.parseCookies(req.headers.cookie);

  if(!cookies.firstName || !cookies.username || !cookies.lastName) {
    res.writeHead(401,{'Location':'/'});
    return res.end(index);
  }
  var html = utils.template(profile, {
    fullName: cookies.firstName + " " + cookies.lastName,
    gender: cookies.gender
  });

  res.end(html);
};
