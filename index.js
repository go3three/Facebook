var http=require("http");
var server =require("./server.js");
http.createServer(server).listen(process.env.PORT || 8080, function() {
    console.log('Listening on 8080');
});
