'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
 'mongodb://127.0.0.1:27017/accounting',

 function(err, connection) {

   var collection = connection.collection('customers');

   collection.update({}, {'$set': {'age': 24}}, function(err, result) {
       console.log('Updated', result.result.n, 'documents');
       collection.find().toArray(function(err, documents) {
          console.dir(documents);
          connection.close();
       });

    });

 });
