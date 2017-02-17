var http = require("http");
    url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;

    // Injection dependence from router
    route(handle, pathname, response);
  };

  http.createServer(onRequest).listen(8888, function() {
    console.log("Server listening on port 8888");
  });

}

exports.start = start;
