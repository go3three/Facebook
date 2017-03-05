var fs =require('fs');
var ico = fs.readFileSync(__dirname + '/../views/imgs/favicon.ico');
module.exports = function(req, res) {
   res.writeHead(200, {
       'Content-type': 'image/x-icon'
   })
   res.write(ico)
   res.end()

}
