var utils = require('../app/utils.js');
var db = require('./config/conn.js');

module.exports = function(req, res) {

  var client = db.createClient(db.config);

  utils.parseBody(req, function(err, data) {
    data = data.split(",");
    var username = data[0];
    var post = data[1];
    var user = `SELECT id FROM info WHERE username='${username}';`;
    db.selectdata(client, user, function(err, result) {
      var user_id = result.rows[0].id;
      var data =`INSERT INTO posts (id_user,date_creation,body)values('${user_id}','09/03/2017','${post}');`;
      db.insertdata(client,data, function(err) {
        if(err) {
          res.writeHead(400);
          return res.end();
        } else {
          res.end(JSON.stringify({
            status: 'success',
            mess: 'posts created successfully'
          }));
        }
      });
    });
  });
}
