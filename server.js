'use strict';

var http = require('http');
var router = require('./app/router.js');

var mainHandler = function(req, res) {
  var path = req.method + ' ' + req.url;
  console.log(path);
  try {
    router[path](req, res);
  } catch (err) {
    console.log('path', path);
    console.log('err', err);
    console.log('THERE WAS AN ERROR SOMEWHERE');
    res.writeHead(404);
    res.end('Not found');
  }
};

module.exports=mainHandler;
