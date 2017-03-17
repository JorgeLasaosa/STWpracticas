var fs = require("fs"),
    formidable = require("formidable"),
    memo = require("./models/memo");
    url = require("url");

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
      var db = new memo();

      db.text = fields.memoText;
      db.deadline = fields.memoDate;
      //db.file = files.upload;

      db.save(function (err) {
        if (err) {
          throw err;
        }
        else {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write("received text: " + fields.memoText + "</br>");
          response.write("received date: " + fields.memoDate + "</br>");
          response.write("received image:<br/>");
          response.write("<img src='/show' />");
          response.end();
        }
      });
    });

    // var mDAO = new memoDAO(function(err, rows) {
    //   response.writeHead(200, {"Content-Type": "text/html"});
    //   response.write("received text: " + fields.memoText + "</br>");
    //   response.write("received date: " + fields.memoDate + "</br>");
    //   response.write("received image:<br/>");
    //   response.write("<img src='/show' />");
    //   response.end();
    // });
    // mDAO.insert(fields.memoText, files.upload, fields.memoDate);
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

  response.writeHead(200,{"Content-Type":"html"});
  response.write(body);
  response.end();
}

function showAllMemo(request, response) {

  memo.find({}, function(err, data) {
    if (err) {
      throw err;
    }
    else {
      var body = '<html>'+
                    '<head>'+
                      '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
                    '</head>'+
                    '<body>' +
                      '<ul>';
      for (let i of data) {
        body += '<li><form action="/showMemo" method="get">' +
                  '<p>Text: ' + i.text + '</p>' +
                  '<p>Deadline: ' + i.deadline + '</p>' +
                  '<input type="hidden" name="id" value="'+i._id+'"/>' +
                  '<input type="submit" value="Show Memo"/>' +
                  '<input type="submit" formaction="/deleteMemo" value="Delete Memo"/>' +
                '</form></li>';
      }

      body +=     '</ul>' +
                '</body>' +
              '</html>';

      response.writeHead(200,{"Content-Type":"html"});
      response.write(body);
      response.end();
    }
  });
}

function showMemo(request, response) {

  var id = url.parse(request.url, true).query.id;
  memo.findById(id, function(err, data) {
    if (err || data.length == 0) {
      response.writeHead(404,{"Content-Type":"html"});
      response.write("404 Not Found");
      response.end();
    }
    else {
      var body =  '<html>'+
                    '<head>'+
                      '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
                    '</head>'+
                    '<body>' +
                      '<p>' + data.text + '</p> </br>' +
                      '<p>Deadline: ' + data.deadline + '</p>' +
                    '</body>' +
                  '</html>';
      response.writeHead(200,{"Content-Type":"html"});
      response.write(body);
      response.end();
    }
  });
}

function deleteMemo(request, response) {

  var id = url.parse(request.url, true).query.id;
  memo.remove({_id : id}, function(err) {
    if (err) {
      response.writeHead(404,{"Content-Type":"html"});
      response.write("404 Not Found");
      response.end();
    }
    else {
      var body =  '<html>'+
                    '<head>'+
                      '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
                    '</head>'+
                    '<body>' +
                      '<p>Deleted Memo</p>' +
                    '</body>' +
                  '</html>';
      response.writeHead(200,{"Content-Type":"html"});
      response.write(body);
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.setMemo = setMemo;
exports.showAllMemo = showAllMemo;
exports.showMemo = showMemo;
exports.deleteMemo = deleteMemo;