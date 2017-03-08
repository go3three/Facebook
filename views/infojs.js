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

var http = new XMLHttpRequest();

function newElement() {
    // console.log(inputValue);
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

console.log(result);

        http.open("POST", "/posts", true);
    var obj =[result[' username'],inputValue];
        http.send(obj);
        refreshposts();
        document.getElementById("post").value = "";
    }
}

function refreshposts() {
    http.open("POST", "/displayposts", true);
    http.send();

    http.onreadystatechange = function(response) {
        if (http.readyState == 4 && http.status == 200) {
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

setInterval(refreshposts, 3000);
