var fs =require('fs');
var ico = fs.readFileSync(__dirname + '/../views/style.css');
module.exports = function(req, res) {
   res.writeHead(200, {
       'Content-type': 'text/css'
   })
   res.write(ico)
   res.end()

}
