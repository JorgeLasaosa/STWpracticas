var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function(error, stdout, stderr) {
    response.writeHead(200, {"Content-Type":"text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log("Request handler 'upload' was called");

  response.writeHead(200,{"Content-Type":"text/plain"});
  response.write("Hello Upload");
  response.end();
}

// Ejercicio practica 1
function ejercicio(response) {
  response.writeHead(200,{"Content-Type":"html"});
  response.write("<html><body><form method='post' action='/ejercicio'><textarea type='text' name='textareaData'></textarea><button>enviar</button></form></body></html>");
  response.end();
}

exports.ejercicio = ejercicio;
////////////////////////////////////////////////////////////////////////////////

exports.start = start;
exports.upload = upload;
