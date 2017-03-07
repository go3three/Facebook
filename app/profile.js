var db = require('./config/conn.js');
var utils = require('./utils.js');
var qs = require('querystring');
var config = {
    user: 'postgres', //env var: PGUSER
    database: 'facebook', //env var: PGDATABASE
    password: '482106', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var client = db.createClient(config);
db.createTable(client, function(errTable, resTable) {
    // client.end();
})
module.exports = function(req, res) {
    utils.parseBody(req, function(undefined, body) {
        var b = JSON.parse(body);
      console.log("*****",b.username,"***");


        var query = `
        INSERT INTO info (
              first_name,
              last_name,
              dob,
              gender,
              about,
              image_url,
              firends,
              username,
              password
          )
          values(
              'ahmed',
              'ibrahim',
              '06/10/1986',
              'M',
              'software engineering',
              'www.google.com',
              '3',
              '${b.username}',
              '${b.password}'
          );
        `;
        db.insertdata(client,query,function(err,result){

              if(err) {
                console.log('errorWrite',err);
              }
        })
var q = "SELECT * FROM info ;";
    db.selectdata(client,q,function(err, result) {
          // console.log(result.rows);
            client.end();

        res.end(JSON.stringify(result.rows)) 
     })

    })
}
