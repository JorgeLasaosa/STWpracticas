function start(response) {
  response.writeHead(200,{"Content-Type":"html"});
  response.write("<html>" +
                  "<body>" +
                    "<form method='post' action='/upload'>" +
                      "<textarea type='text' name='textareaData'></textarea>" +
                      "<input type='submit' value='Submit'/>" +
                    "</form>" +
                  "</body>" +
                 "</html>");
  response.end();
}

function upload(response) {
  console.log("Request handler 'upload' was called");

  response.writeHead(200,{"Content-Type":"text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
