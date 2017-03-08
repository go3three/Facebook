'use strict';

var test = require('tape');
var utils = require('../app/utils.js');

test('utils:parseCookies => should return an empty object if no cookies', (t) => {
  var one = '';
  var two = undefined;
  var expectedOutput = {};
  var outOne = utils.parseCookies(one);
  var outTwo = utils.parseCookies(two);
  t.deepEqual(outOne,expectedOutput,'got empty object');
  t.deepEqual(outTwo,expectedOutput,'got empty object');
  t.end();
});

test('utils:parseCookies => should return an object with keys and values', (t) => {
  var rawCookie = 'G_AUTHUSER_H=0';
  var expectedOutput = {'G_AUTHUSER_H':'0'};
  var parseCookies = utils.parseCookies(rawCookie);
  t.deepEqual(parseCookies,expectedOutput,'got right object');
  t.end();
});

test('utils:parseCookies => should trim white spaces', t => {
  var rawCookie = 'firstName=Besart; lastName=Shyti; gender=M; username=Bes; login=1';
  var expectedOutput = {
    firstName: 'Besart',
    lastName: 'Shyti',
    gender: 'M',
    username: 'Bes',
    login: '1'
  };
  var parseCookies = utils.parseCookies(rawCookie);
  t.deepEqual(parseCookies,expectedOutput,'got right object');
  t.end();
});

test('utils:template => should return a right template combination', t => {
  var tmpl = '<h1>{{name}}</h1>';
  var html = utils.template(tmpl,{name:'Bes'});
  t.equal(html,'<h1>Bes</h1>','got right hmtl output');
  t.end();
});
