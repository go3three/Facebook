'use strict';

module.exports = {
  info: `CREATE TABLE IF NOT EXISTS info (id SERIAL, first_name varchar(50), last_name varchar(50), dob date, gender char(2), about text, image_url text, friends int, username varchar(25), password varchar(50), primary key(id));`,
  posts: `CREATE TABLE IF NOT EXISTS posts (id_post SERIAL,id_user int references info(id), date_creation date,body text,primary key(id_post));`,
  friends: `CREATE TABLE IF NOT EXISTS friends (id_friend int primary key, id_user int references info(id), date_of_friendship date);`
};
