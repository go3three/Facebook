'use strict';

var pg = require('pg');
var URL = require('url-parse');
var sqlQueries = require('./sql.js');

var url = new URL(process.env.DATABASE_URL || 'postgres://postgres:482106@localhost:5432/test');

var config = {
  user: url.username,
  database: url.pathname.split('/')[1],
  password: url.password,
  host: url.hostname,
  port: url.port,
  max: 10,
  idleTimeoutMillis: 30000,
  ssl: process.env.DATABASE_URL ? true : false
};

var createClient = (config, cb) => {
  var client = new pg.Client(config);
  client.connect(err => {
    if (err) {
      throw err;
    }
  });

  return client;
};

/**
 * Creates all the tables needed
 * @param  {[type]}   client [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
var createTable = (client, cb) => {
    var finalQuery = `${sqlQueries.info} ${sqlQueries.posts} ${sqlQueries.friends}`;
    client.query(finalQuery, cb);
};

var selectdata = (client, query, cb) => {

    client.query(query, cb);
};
var insertdata = (client, data, cb) => {
    client.query(data, cb);
};

module.exports = {
        config: config,  createClient: createClient,
  createTable: createTable,
  insertdata: insertdata,
  selectdata: selectdata
};
