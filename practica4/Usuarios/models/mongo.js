var mongoose    =   require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "userEmail" : String,
    "userPassword" : String
};

// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);
