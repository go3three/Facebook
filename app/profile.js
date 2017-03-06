var client = require('./config/conn.js');
var utils = require('./utils.js');

module.exports = function(req, res) {

    utils.parseBody(req, function(err, body) {

        // res.end(JSON.stringify(body));
console.log(JSON.parse(body));

client.query("insert into info (first_name,last_name,dob,gender,about,image_url,firends,username,password)\
 values('ahmed','ibrahim','06/10/1986','M','software engineering','www.google.com',3,'');",
    function(errorWrite, result) {
        if (errorWrite) {
            console.log('errorWrite', errorWrite);
        }


    });

  });
// var r=sel(function(b){
// b.rows.maps(function(ele){
//
//
// })
//   return b});
client.query("select * from info where id =4").on('row', function(row) {
    var r = [];
    r.push(JSON.stringify(row))
    res.end(JSON.stringify(r))
});


}
