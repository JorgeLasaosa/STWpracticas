var http = require("http");
    url = require("url");
    querystring = require("querystring");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;

    // Injection dependence from router
    route(handle, pathname, response);

    // Ejercicio practica 1
    if (request.method === 'POST') {
      var body = "";
      request.addListener("data", function(chunk) {
        body += chunk;
      });

      request.addListener("end", function() {
        body = querystring.parse(body);
        console.log(body.textareaData);
      });
    }
    ///////////////////////////////////////////////////////////////////////////
  };

  http.createServer(onRequest).listen(8888, function() {
    console.log("Server listening on port 8888");
  });

}

exports.start = start;
