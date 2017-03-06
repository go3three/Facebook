module.exports={
'GET /':require('../views/main.js'),
'GET /favicon.ico':require("../views/favicon.js"),
'GET /style.css':require("../views/style.js"),
'POST /profile':require("../app/profile.js")
}
