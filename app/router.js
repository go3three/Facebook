module.exports = {
    'GET /': require('../views/main.js'),
    'GET /favicon.ico': require("../views/favicon.js"),
    'GET /style.css': require("../views/style.js"),
    'POST /profile': require("../app/login.js"),
    'GET /profile': require("../views/profilemain.js"),
    'GET /reg': require("../views/reg_main.js"),
    'POST /reg': require("../app/reg.js"),
    'GET /wtfdiary.css': require("../app/profile.js"),
    'GET /cameraa.png': require("../app/profile.js"),
    'GET /imgs/ghada.jpg': require("../app/profile.js"),
    'GET /info.js': require("../app/info.js")
}
