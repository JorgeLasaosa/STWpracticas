var http = require("http");
    url = require("url");

function start(route, handle) {

  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;

    request.setEncoding("utf8");
    var postData = "";
    request.addListener("data", function(chunk) {
      postData += chunk;
    });

    request.addListener("end", function() {
      // Injection dependence from router
      route(handle, pathname, response, postData);
    });
  };

  http.createServer(onRequest).listen(8888, function() {
    console.log("Server listening on port 8888");
  });

}

exports.start = start;
