var db = require('./config/conn.js');
var utils = require('./utils.js');
var qs = require('querystring');
var fs = require('fs');
var client = db.createClient(db.config);
module.exports = function(req, res) {
    utils.parseBody(req, function(undefined, body) {

        var b = qs.parse(body);
        var q = `SELECT username,password FROM info where username='${b.username}' and password='${b.password}' LIMIT 1;`;
            db.selectdata(client, q, function(err, result) {
                if(result.rows){
                console.log("this is result" + result.rows);
                client.end();
                  res.end(JSON.stringify(result.rows))
          }else{
                  res.redirect("/");



          }  })
        })


}
