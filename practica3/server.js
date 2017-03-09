var http = require("http"),
    url = require("url");

function start(route, handle) {

  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;

    // if (request.method.toLowerCase() == 'get') {
    //   console.log(url.parse(request.url));
    // }
    // Injection dependece from router.js
    route(handle, pathname, request, response);
  };

  http.createServer(onRequest).listen(8888, function() {
    console.log("Server listening on port 8888");
  });

}

exports.start = start;
