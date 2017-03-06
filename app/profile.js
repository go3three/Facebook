var client = require('./config/conn.js');
var utils = require('./utils.js');
var qs = require('querystring')
module.exports = function(req, res) {

    utils.parseBody(req, function(err, body) {

        // res.end(JSON.stringify(body));
var b=qs.parse(body);

client.query(`
  insert into
    info (
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
    )
  ;`, function(errorWrite, result) {
        if (errorWrite) {
            console.log('errorWrite', errorWrite);
        }
        console.log('result',result);
        client.query("SELECT * FROM info", function(err, row) {
          console.log('row',row);
          var r = [];
      //  res.end('ok?');
           r.push(JSON.stringify(row))
           res.end(JSON.stringify(r))
        });
    });
  });
}
