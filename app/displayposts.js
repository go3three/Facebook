var utils = require('../app/utils.js');
var db = require('./config/conn.js');
var client = db.createClient(db.config);

module.exports = function(req, res) {


var query=`SELECT * FROM posts;`;

    db.selectdata(client,query,function(err, result) {
        res.end(JSON.stringify(result.rows));
    });
}
