var MongoClient = require('mongodb').MongoClient;

var insertDocuments = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('documents');
  // Insert some documents 
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}
 
// Connection URL 
var url = 'mongodb://localhost:27017/prueba';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");
 
  insertDocuments(db, function() {
    db.close();
  });
});

