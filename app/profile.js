var db = require('./config/conn.js');
var utils = require('./utils.js');
var qs = require('querystring');
var config = {
    user: 'fxabnxhklpyyrv', //env var: PGUSER
    database: 'd5n26g4qdcdst4', //env var: PGDATABASE
    password: '153dbea38521b25d53bd635d5b26a6e98dc53d5da98e0ea51c5f37bfa78fe37e', //env var: PGPASSWORD
    host: 'ec2-23-23-237-68.compute-1.amazonaws.com', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
    ssl:true // how long a client is allowed to remain idle before being closed
};
var client = db.createClient(config);
db.createTable(client, function(errTable, resTable) {
    // client.end();
})
module.exports = function(req, res) {
    utils.parseBody(req, function(undefined, body) {

        var b = qs.parse(body);
        var query = `
        INSERT INTO info (
              first_name,
              last_name,
              dob,
              gender,
              about,
              image_url,
              friends,
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
        db.insertdata(client, query, function(err, result) {

            if (err) {
                console.log('errorWrite', err);
            }
        })
        var q = `SELECT * FROM info where username=${b.username};`;
        db.selectdata(client, q, function(err, result) {

            console.log(result.rows);
            client.end();

            res.end(JSON.stringify(result.rows))
        })

    })
}
