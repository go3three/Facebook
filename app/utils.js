'use strict';

var qs = require('querystring');

/**
 * [parseBody description]
 * @param  {[type]}   req      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function parseBody(req, callback) {
  var body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    callback(undefined,body);
  });
}

/**
 * Parse cookies
 * @param  {String} rawCookies e.g. 'A=hello; B=bes'
 * @return {Object}            key values pairs
 */
function parseCookies(rawCookies) {
  if(rawCookies === undefined || rawCookies === '') {
    return {};
  }

  return rawCookies.split(';').reduce((acc,elm) => {
    var splitElm = elm.split('=');
    var key = splitElm[0].trim();
    var value = splitElm[1];
    acc[key] = value;
    return acc;
  },{});
}

/**
 * [template description]
 * @param  {[type]} tpl  [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function template(tpl, data) {
  Object.keys(data).forEach(function(key) {
    tpl = tpl.replace(
      new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}', 'g'),
      data[key]
    );
  });
  return tpl;
}

module.exports = {
  parseBody: parseBody,
  parseCookies: parseCookies,
  template: template
};
