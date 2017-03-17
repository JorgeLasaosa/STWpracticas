var express = require("express");
    bodyParser = require("body-parser");
    app = express();
    router = express.Router();
    memo = require("./models/memo.js");

// Accept JSON and URLencoded values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/", router);

var server = app.listen(8888, function() {
  console.log("Server listening on port %s", server.address().port);
});

/*
 *  /memos
 */
router.route("/memos")
    .get(function(req, res) {
        var response = {};
        memo.find({}, function (err, data) {
            if (err) {
              response = {"error" : true, "message" : "Error fetching data"};
            }
            else {
              response = {"error" : false, "message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req, res) {
        var db = new memo();
        var response = {};

        db.text = req.body.text;
        db.deadline = req.body.date;
        db.file = req.body.file;

        db.save(function(err) {
            if (err) {
                response = {"error" : true, "message" : "Error adding data"};
            }
            else {
                response = {"error" : false, "message" : "Data added"};
            }
            res.json(response);
        });
    });

/*
 * /memos/:id
 */
router.route("/memos/:id")
    .get(function(req, res) {
        var response = {};
        memo.findById(req.params.id, function(err, data) {
            if (err) {
                response = {"error" : true, "message" : "Error fetching data"};
            }
            else {
                response = {"error" : false, "message" : data};
            }
            res.json(response);
        });
    })
    .delete(function(req, res) {
        var response = {};
        memo.remove({_id : req.params.id}, function(err) {
            if (err) {
                response = {"error" : true, "message" : "Error deleting data"};
            }
            else {
                response = {"error" : false, "message" : "Data assciated with " + req.params.id + " is deleted"};
            }
            res.json(response);
        });
    });
