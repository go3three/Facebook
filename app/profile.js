var db = require('./config/conn.js');
var utils = require('./utils.js');
var qs = require('querystring');
var fs =require('fs');
var wtfdiary = fs.readFileSync(__dirname + '/../views/wtfdiary.css');
var cameraa = fs.readFileSync(__dirname + '/../views/cameraa.png');
var cover = fs.readFileSync(__dirname + '/../views/cover.jpg');
var client = db.createClient(db.config);
db.createTable(client, function(errTable, resTable) {
    // client.end();
})
module.exports = function(req, res) {

    var path = req.method + ' ' + req.url;
    if (path == 'GET /wtfdiary.css') {
      res.writeHead(200, {
          'Content-type': 'text/css'
      })
      res.write(wtfdiary)
    } else if (path == 'GET /cameraa.png') {
      res.writeHead(200, {
          'Content-type': 'image/png'
      })
      res.write(cameraa)
    } else if (path == 'GET /cover.jpg') {
      res.writeHead(200, {
          'Content-type': 'text/png'
      })
      res.write(cover)
    }
    res.end();
    // utils.parseBody(req, function(undefined, body) {
    //
    //     var b = qs.parse(body);
    //     db.insertdata(client, query, function(err, result) {
    //
    //         if (err) {
    //             console.log('errorWrite', err);
    //         }
    //     })
    //     var q = `SELECT username,password FROM info where username='${b.username}' LIMIT 1;`;
    //     db.selectdata(client, q, function(err, result) {
    //
    //         console.log("this is result" + result.rows);
    //         client.end();
    //
    //         res.end(JSON.stringify(result.rows))
    //     })
    //
    // })
}
