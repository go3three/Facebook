'use strict';
var test = require('tape');
var shot = require('shot');
var mainHandler = require('../server.js');
// test('GET /notFound: should return not found ', function(t) {
//     shot.inject(mainHandler, {
//         method: 'GET',
//         url: '/notFound'
//     }, function(res) {
//         t.equal(res.payload, 'Not found', 'BOOM!');
//         t.end();
//     });
// });
// test('GET /: should return Facebook title', function(t) {
//     shot.inject(mainHandler, { method: 'GET', url: '/' }, function(res) {
//         var indexOf = res.payload.indexOf('title');
//         t.notEqual(indexOf, -1, 'got the title somewhere in the html');
//         t.equal(res.statusCode, 200, 'index file is exist ');
//         t.end();
//     });
// });
test('GET /favicon.ico: should return icon', function(t) {
    shot.inject(mainHandler, { method: 'GET', url: '/favicon.ico' }, function(res) {
        t.equal(res.headers["Content-type"],"image/x-icon" , 'the favicon is exist');
        t.equal(res.statusCode, 200, 'index file is exist ');
        t.end();
    });
});

test('POST /: should return icon', function(t) {
    shot.inject(mainHandler, { method: 'POST', url: '/profile' ,payload:{"name":"aaa"}}, function(res) {

        t.equal(res.statusCode, 200, 'index file is exist ');
        t.end();
    });
});
