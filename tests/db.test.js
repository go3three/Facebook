'use strict';
var test = require('tape');
var shot = require('shot');
var db = require('../app/config/conn.js');
var config = {
    user: 'postgres', //env var: PGUSER
    database: 'test', //env var: PGDATABASE
    password: '482106', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var client = db.createClient(config);

test('db.createTable(): should select data from the table info', t => {
  db.createTable(client, function(err, result) {
    t.notOk(err,'table created successfully');
    t.end();
  });
});
test('db.insertdata(): insert data in info table', t => {
  db.insertdata(client,`INSERT INTO info (first_name,last_name,dob,gender,about,image_url,friends,username,password) VALUES ('test','test','11-11-2000','m','','www.google.com','0','test','test');`,(errInsert, resInsert) => {
    t.notOk(errInsert, 'no errors');
    t.ok(resInsert, 'got res result');
    client.end(() => {
      t.end();
    });
  });
});
test('finish database client', t => {
  client.end(() => {
    t.pass('done, database down');
    t.end();
  })
})
