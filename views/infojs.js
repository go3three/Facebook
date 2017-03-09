/**
 * Abstraction over XHR
 * @param  {Object}    configObj config object
 * @param  {Function}  cb  callback with `error` or `data`
 * @return {Undefined}
 *
 * Where configObj looks like:
 * {
 *  method: 'POST',
 *  url: 'https://api.textrazor.com/',
 *  params: 'text=foo&extractors=topics',
 *  headers: [
 *    'content-type:application/x-www-form-urlencoded',
 *    'X-TextRazor-Key:66a749422373f8fc2ca107aax9g5c38dff2014e05f4e49ba9c782d34'
 *  ]
 * }
 */
var request = function (configObj, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      cb(undefined, json);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      cb(xhr.responseText,undefined);
    }
  };
  xhr.open(configObj.method, configObj.url, true);

  if(configObj.headers !== undefined) {
    configObj.headers.forEach(function(elm) {
      var header = elm.split(':');
      xhr.setRequestHeader(header[0],header[1]);
    });
  }

  xhr.send(configObj.params);
};

function logout() {
  var cookies = document.cookie.split(";");
  console.log(document.cookie);
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function newElement() {

  var inputValue = document.getElementById("post").value;

  if (inputValue === '') {
    alert("You must write something!");
  } else {
    var str = document.cookie;
    str = str.split(';');
    var result = {};
    for (var i = 0; i < str.length; i++) {
      var cur = str[i].split('=');
      result[cur[0]] = cur[1];
    }

    var obj = [result[' username'],inputValue];

    request({
      method: 'POST',
      url: '/posts',
      params: obj
    }, function(err, json) {
      console.log('err',err);
      console.log('json',json);
      refreshposts();
      document.getElementById("post").value = "";
    });
  }
}

function refreshposts() {

  var http = new XMLHttpRequest();
  http.open("POST", "/displayposts", true);
  http.send();

  http.onreadystatechange = function(response) {
    if (http.readyState === 4 && http.status === 200) {
      document.getElementById("list").innerHTML = "";
      jsonOptions = JSON.parse(http.responseText);

      jsonOptions.reverse().forEach(function(elem) {
        var p = document.createElement("article");
        var t = document.createTextNode(elem.body);
        p.appendChild(t);
        document.getElementById("list").appendChild(p);
      });
    }
  }
}

setInterval(refreshposts, 5000);
