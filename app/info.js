var fs =require('fs');
var infojs = fs.readFileSync(__dirname + '/../views/infojs.js');
module.exports = function(req, res) {
   res.writeHead(200, {
    'Content-type': 'application/javascript'
   })
   res.write(infojs)
   res.end()

}
