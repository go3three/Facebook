'use strict';

var test = require('tape');
var shot = require('shot');
var mainHandler = require('../server.js');

test('GET /notFound: should return not found ', function(t) {
  shot.inject(mainHandler, {
    method: 'GET',
    url: '/notFound'
  }, function(res) {
    t.equal(res.statusCode, 404, 'got right status code');
    t.equal(res.payload, 'Not found', 'BOOM!');
    t.end();
  });
});

test('GET /: should return Facebook login page with no cookies', (t) => {
  shot.inject(mainHandler, {
    method: 'GET',
    url: '/'
  }, function(res) {
    var indexOf = res.payload.indexOf('title');
    t.notEqual(indexOf, -1, 'got the title somewhere in the html');
    t.equal(res.statusCode, 401, 'got not authenticated status code');
    t.end();
  });
});

test('GET /: should return Facebook wall page with cookies', t => {
  shot.inject(mainHandler, {
    method: 'GET',
    url: '/',
    headers: {cookie: 'firstName=Besart; lastName=Shyti; gender=M; username=Bes; login=1'}
  }, (res) => {
    t.equal(res.statusCode,200,'got 200 status code');
    t.end();
  });
});

test('GET /favicon.ico: should return icon', function(t) {
  shot.inject(mainHandler, {
    method: 'GET',
    url: '/favicon.ico'
  }, function(res) {
    t.equal(res.headers["Content-type"], "image/x-icon", 'the favicon is exist');
    t.equal(res.statusCode, 200, 'index file is exist ');
    t.end();
  });
});

test('GET /profile => should post data', function(t) {
  shot.inject(mainHandler, {
    method: 'GET',
    url: '/profile',
    headers: {cookie: 'firstName=Besart; lastName=Shyti; gender=M; username=Bes; login=1'}
  }, res => {
    var indexOf = res.payload.indexOf('Besart Shyti');
    t.notEqual(indexOf, -1, 'got right html with user info')
    t.equal(res.statusCode, 200, 'got 200 status code');
    t.end();
  });
});

test('POST /posts => should post data', function(t) {

  // in order to test posts, the username must exists in the database
  shot.inject(mainHandler, {
    method: 'POST',
    url: '/reg',
    payload: 'username=Foo&password=123&Fname=Besart&Lname=Shyti&dob=2017-03-22&gender=M'
  }, res => {

    shot.inject(mainHandler, {
      method: 'POST',
      url: '/posts',
      headers: {cookie: 'firstName=Besart; lastName=Shyti; gender=M; username=Foo; login=1'},
      payload: 'Foo,fdas'
    }, res => {
      console.log('res.payload',res.payload);
      t.equal(res.statusCode, 200, 'got 200 status code');
      t.end();
    });
  });
});
