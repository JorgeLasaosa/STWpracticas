var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/memo');

// create instance of Schema
var mongoSchema = mongoose.Schema;

// create Schema
var memoSchema = {
  "text" : String,
  "deadline" : Date,
  "file" : Buffer
}

// create model if not exists.
module.exports = mongoose.model('memos',memoSchema);
