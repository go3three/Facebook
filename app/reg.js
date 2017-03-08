var db = require('./config/conn.js');
var utils = require('./utils.js');
var qs = require('querystring');
var fs =require('fs');
var error = fs.readFileSync(__dirname + '/../views/error.html');
var profile = fs.readFileSync(__dirname + '/../views/profile.html');
var client = db.createClient(db.config);
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
              '${b.Fname}',
              '${b.Lname}',
              '${b.dob}',
              '${b.gender}',
              '',
              'www.google.com',
              '0',
              '${b.username}',
              '${b.password}'
          );
        `;
        db.insertdata(client, query, function(err, result) {

            if (err) {
                res.end(error);
                console.log('errorWrite', err);
            }else{
              res.writeHead(302, {
                            'Set-Cookie':[`FirstName=${b.Fname}`,`LastName=${b.Fname}`,`gender=${b.gender}`,`username=${b.username}`,'login=1']
                        });
                res.end(profile);
            }
        })

})

}
