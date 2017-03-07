'use strict';
var pg = require('pg');
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

var selectdata = (client,query,cb) => {
     client.query(query,cb);
};
var insertdata = (client, data, cb) => {
    // var rawSql = `INSERT INTO info VALUES (\'${data}\');`;
    client.query(data, cb);
};
module.exports = {
    createClient: createClient,
    createTable: createTable,
    insertdata: insertdata,
    selectdata:selectdata
};
