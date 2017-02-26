var fs = require("fs"),
    formidable = require("formidable"),
    memoDAO = require("./database/memoDAO.js");

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

    var mDAO = new memoDAO();

    mDAO.insert(fields.memoText, files.upload, fields.memoDate);

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received text: " + fields.memoText + "</br>");
    response.write("received date: " + fields.memoDate + "</br>");
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(request, response) {
  response.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream("/tmp/test.png").pipe(response);
}

function setMemo(request, response) {
  var body =  '<html>'+
                '<head>'+
                  '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                  '<form action="/upload" enctype="multipart/form-data" method="post">'+
                    '<input type="file" name="upload" multiple="multiple">'+
                    '</br>Tarea:</br>'+
                    '<textarea name="memoText" rows="4" cols="50" ></textarea>' +
                    '</br>Fecha límite</br>' +
                    '<input type="date" name="memoDate">' +
                    '<input type="submit" value="Upload Memo" />'+
                  '</form>'+
                '</body>'+
              '</html>';
  request.setEncoding("utf8");

  response.writeHead(200,{"Content-Type":"html"});
  response.write(body);
  response.end();
}

function showAllMemo(request, response) {

  var mDAO = new memoDAO(function(err, rows, fields) {

    var body = '<html>'+
                  '<head>'+
                    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
                  '</head>'+
                  '<body>' +
                    '<ul>';
    for (let i of rows) {
      body += '<li><form action="/showMemo" method="get">' +
                i.nombre +
                '<input type="hidden" name="id" value="'+i.id+'"/>' +
                '<input type="submit" value="Show Memo"/>' +
              '</form></li>';
    }

    body +=     '</ul>' +
              '</body>' +
            '</html>';

    response.writeHead(200,{"Content-Type":"html"});
    response.write(body);
    response.end();
  });

  mDAO.getAllMemo();
}

function showMemo(request, response) {
  response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.setMemo = setMemo;
exports.showAllMemo = showAllMemo;
exports.showMemo = showMemo;
