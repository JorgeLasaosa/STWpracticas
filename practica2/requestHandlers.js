var fs = require("fs"),
    formidable = require("formidable");

function start(request, response) {

  var body =  '<html>'+
                '<head>'+
                  '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                  '<form action="/upload" enctype="multipart/form-data" method="post">'+
                    '<input type="file" name="upload" multiple="multiple">'+
                    '<input type="submit" value="Upload file" />'+
                  '</form>'+
                '</body>'+
              '</html>';
  request.setEncoding("utf8");

  response.writeHead(200,{"Content-Type":"html"});
  response.write(body);
  response.end();
}

function upload(request, response) {
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    /* Possible error on Windows systems:
     tried to rename to an already existing file */
    fs.rename(files.upload.path, "/tmp/test.png", function(error) {
      if (error) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
      }
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(request, response) {
  response.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
