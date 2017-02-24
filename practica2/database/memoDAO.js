var pool;
var callback;

function memoDAO(callbackFunction) {
	callback = callbackFunction;
	pool = require("./connectionPool.js");
}

memoDAO.prototype.insert = function(text, file, deadline) {
  pool.getConnection(function(err, conn) {
    var values = {
      text : text,
      file : file,
      deadline : deadline
    };

    conn.query("insert into memo set ?", values, function(err, rows, fields) {
      conn.release();
			if (typeof callback === 'function') {
	      if (err) {
	        callback(err, null, null);
	      }
	      else {
	        callback(null, rows, fields);
	      }
			}
    });
  });
}

// var mDAO = new memoDAO(function(err, rows, fields) {
//   if (err) throw err;
//   console.log(rows);
// });
//
// mDAO.insert("Jorge");

module.exports = memoDAO;
