var fs = require('fs');
var index = fs.readFileSync(__dirname + '/../views/index.html');
var profile = fs.readFileSync(__dirname + '/../views/profile.html');

function template(tpl, data) {
    Object.keys(data).forEach(function(key) {
        tpl = tpl.replace(
            new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}', 'g'),
            data[key]
        );
    });
    return tpl;
}
module.exports = function(req, res) {
console.log("req.headers.cookie",req.headers.cookie);
    if (req.headers.cookie) {
        var c = req.headers.cookie;

        var info = c.split(";");
        var FirstName = info[0].split("=");
        var LastName = info[1].split("=");
        var Gender = info[2].split("=");
        var username = info[3].split("=");
        if (username) {
            if (Gender == "M") {
                Gender = "Male";
            } else {
                Gender = "Female";
            }
            console.log("profile ",profile);
            var html = template(profile, {
                FullName: FirstName + " " + LastName,
                Gender: Gender
            });
            console.log("here1");
            res.end(html);
        }
        // else {
        //
        //     res.end(profile)
        // }
    } else {
          console.log("here2");
        res.end(index)
    }

}
