var mysql = require('mysql');

function getConnection(callback) {

  var pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'toor',
    database : 'memo'
  });

  pool.getConnection(function(err, conn) {
    callback(err, conn);
  });
}

exports.getConnection = getConnection;
