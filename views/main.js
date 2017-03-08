var fs = require('fs');
var index = fs.readFileSync(__dirname + '/../views/index.html');
var profile = fs.readFileSync(__dirname + '/../views/profile.html');
module.exports = function(req, res) {
    if (req.headers.cookie) {
        var c = req.headers.cookie;
        var info = c.split(";");
        var username = info[3].split("=");
        if (username) {
            res.end(profile);
        } else {

            res.end(index)

        }

    } else {
        res.end(index)
    }


}
