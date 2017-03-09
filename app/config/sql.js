'use strict';

module.exports = {
  info: `CREATE TABLE IF NOT EXISTS info (
    id SERIAL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    dob DATE,
    gender CHAR(2),
    about TEXT,
    image_url TEXT,
    friends INT,
    username VARCHAR(25) UNIQUE,
    password VARCHAR(50),
    PRIMARY KEY(id)
  );`,
  posts: `CREATE TABLE IF NOT EXISTS posts (
    id_post SERIAL,
    id_user INT REFERENCES info(id),
    date_creation DATE,
    body TEXT,
    PRIMARY KEY(id_post)
  );`,
  friends: `CREATE TABLE IF NOT EXISTS friends (
    id_friend INT PRIMARY KEY,
    id_user INT REFERENCES info(id),
    date_of_friendship DATE
  );`
};
