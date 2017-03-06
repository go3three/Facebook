function parseBody(req, callback) {
    var body = '';
    req.on('data', function(data) {
      data=data.toString();
        body += data;
    });
    req.on('end', function() {
        callback(undefined, body);
    });
}
module.exports = {
    parseBody: parseBody
};
