'use strict';

var fs = require('fs');
var wtfdiary = fs.readFileSync(__dirname + '/../views/wtfdiary.css');
var img = fs.readFileSync(__dirname + '/../views/imgs/ghada.jpg');
var cover = fs.readFileSync(__dirname + '/../views/cover.jpg');

module.exports = {
    'GET /': require('../views/main.js'),
    'GET /favicon.ico': require('../views/favicon.js'),
    'GET /style.css': require('../views/style.js'),
    'POST /profile': require('../app/login.js'),
    'GET /profile': require('../views/profilemain.js'),
    'GET /reg': require('../views/reg_main.js'),
    'POST /reg': require('../app/reg.js'),
    'GET /info.js': require('../app/info.js'),
    'GET /wtfdiary.css': (req, res) => {
      res.writeHead(200,{'Content-type':'text/css'});
      res.write(wtfdiary);
      res.end();
    },
    'GET /cameraa.png': (req, res) => {
      res.writeHead(200,{'Content-type':'image/jpg'});
      res.write(img);
      res.end();
    },
    'GET /imgs/ghada.jpg': (req,res) => {
      res.writeHead(200,{'Content-type':'image/jpg'});
      res.write(cover);
      res.end();
    },
}
