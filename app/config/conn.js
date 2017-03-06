'use strict';

var pg = require('pg');
var config = {
    // user: 'postgres', //env var: PGUSER
    database: 'facebook', //env var: PGDATABASE
    // password: '482106', //env var: PGPASSWORD
    // host: 'localhost', // Server hosting the postgres database
    // port: 5432, //env var: PGPORT
    // max: 10, // max number of clients in the pool
    // idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var client = new pg.Client(config);

client.connect(function(err) {
    if (err) throw err;

    client.query(`Create table if not exists info 
      (id SERIAL, first_name varchar(50),last_name varchar(50)
                ,dob date,gender char(2),about text,image_url text ,
                firends int,username varchar(25),password varchar(50),primary key(id));`, function(errorWrite, result) {
        if (errorWrite) {
            console.log('errorWrite', errorWrite);
        }


    });
    client.query('Create table if not exists  posts (id_post SERIAL,id_user int references info(id),\
                  date_creation date,body text,primary key(id_post));',
        function(errorWrite, result) {
            if (errorWrite) {
                console.log('errorWrite', errorWrite);
            }


        });
    client.query('Create table if not exists  friends (id_friend int primary key,\
                  id_user int references info(id),date_of_friendship date);',
        function(errorWrite, result) {
            if (errorWrite) {
                console.log('errorWrite', errorWrite);
            }

            // client.end(function(err) {
            //     if (err) throw err;
            // });
        });

});

module.exports=client;
