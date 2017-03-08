'use strict';

var db = require('../app/config/conn.js');

// create connect to DB to create tables
var client = db.createClient(db.config);

// create table and close the connection
db.createTable(client, function(errTable, resTable) {

  if(errTable) {
    console.log('error while trying to create tables');
    console.log('errTable',errTable);
    // throw errTable;
  }

  console.log('OK: TABLE CREATED');
  client.end();
});
