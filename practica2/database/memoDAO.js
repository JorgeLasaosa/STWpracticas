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

memoDAO.prototype.getAllMemo = function() {
	pool.getConnection(function(err,conn) {
		conn.query("select * from test", function(err, rows, fields) {
			conn.release();
			if (typeof callback === 'function') {
	      if (err) {
	        callback(err, null, null);
	      }
	      else {
	        callback(null, rows, fields);
	      }
			}
		})
	});
}

memoDAO.prototype.deleteMemo = function(id) {
	pool.getConnection(function(err,conn) {
		conn.query("delete from test where id=?", id, function(err, rows, fields) {
			conn.release();
			if (typeof callback === 'function') {
	      if (err) {
	        callback(err, null, null);
	      }
	      else {
	        callback(null, rows, fields);
	      }
			}
		})
	});
}

module.exports = memoDAO;
