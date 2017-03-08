'use strict';

var pg = require('pg');
var sqlQueries = require('./sql.js');

var config = {
    user: 'fxabnxhklpyyrv', //env var: PGUSER
    database: 'd5n26g4qdcdst4', //env var: PGDATABASE
    password: '153dbea38521b25d53bd635d5b26a6e98dc53d5da98e0ea51c5f37bfa78fe37e', //env var: PGPASSWORD
    host: 'ec2-23-23-237-68.compute-1.amazonaws.com', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
    ssl: true // how long a client is allowed to remain idle before being closed
};

// var config = {
//     user: 'postgres', //env var: PGUSER
//     database: 'facebook', //env var: PGDATABASE
//     password: '482106', //env var: PGPASSWORD
//     host: 'localhost', // Server hosting the postgres database
//     port: 5432, //env var: PGPORT
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000,
//     // ssl: true // how long a client is allowed to remain idle before being closed
// };

var createClient = (config, cb) => {
  var client = new pg.Client(config);
  client.connect(err => {
    if (err) { throw err;}
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
  config: config,
  createClient: createClient,
  createTable: createTable,
  insertdata: insertdata,
  selectdata: selectdata
};
