'use strict';
var pg = require('pg');
// var config = {
//     user: 'fxabnxhklpyyrv', //env var: PGUSER
//     database: 'd5n26g4qdcdst4', //env var: PGDATABASE
//     password: '153dbea38521b25d53bd635d5b26a6e98dc53d5da98e0ea51c5f37bfa78fe37e', //env var: PGPASSWORD
//     host: 'ec2-23-23-237-68.compute-1.amazonaws.com', // Server hosting the postgres database
//     port: 5432, //env var: PGPORT
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000,
//     ssl: true // how long a client is allowed to remain idle before being closed
// };
var config = {
    user: 'postgres', //env var: PGUSER
    database: 'facebook', //env var: PGDATABASE
    password: '482106', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
    ssl:true // how long a client is allowed to remain idle before being closed
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

var createTable = (client, cb) => {
    var info = `Create table if not exists info
      (id SERIAL, first_name varchar(50),last_name varchar(50)
                ,dob date,gender char(2),about text,image_url text ,
                friends int,username varchar(25),password varchar(50),primary key(id));`;
    var posts = 'Create table if not exists  posts (id_post SERIAL,id_user int references info(id),\
                              date_creation date,body text,primary key(id_post));';
    var friends = 'Create table if not exists  friends (id_friend int primary key,\
                                          id_user int references info(id),date_of_friendship date);';
    client.query(info, cb);
    client.query(posts, cb);
    client.query(friends, cb);
};


var selectdata = (client, query, cb) => {
    client.query(query, cb);
};
var insertdata = (client, data, cb) => {
    // var rawSql = `INSERT INTO info VALUES (\'${data}\');`;
    client.query(data, cb);
};
module.exports = {
    config: config,
    createClient: createClient,
    createTable: createTable,
    insertdata: insertdata,
    selectdata: selectdata
};
