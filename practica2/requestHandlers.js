var querystring = require("querystring");

function start(response, postData) {
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

function upload(response, postData) {
  console.log("Request handler 'upload' was called");

  var text = querystring.parse(postData).textareaData;

  response.writeHead(200,{"Content-Type":"text/plain"});
  response.write("You've sent: " + text);
  response.end();
}

exports.start = start;
exports.upload = upload;
