var express = require("express");
    bodyParser = require("body-parser");
    app = express();
    router = express.Router();
    memo = require("./models/memo.js");
    swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
var swaggerDefinition = {
    "info": {
        "title" : "API de gestión de notas",
        "version" : "1.0.0",
        "description" : "Descripción del API del servicio de notas"
    },
    "host" : "localhost:8888",
    "basePath" : "/"
};

// Options for Swagger docs
var options = {
    // import swaggerDefinitions
    "swaggerDefinition" : swaggerDefinition,
    // path to API docs
    "apis" : ["*.js"]
}

// Initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

app.use(express.static("public"));

// Accept JSON and URLencoded values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/", router);

var server = app.listen(8888, function() {
  console.log("Server listening on port %s", server.address().port);
});

// Serve Swagger
app.get("/swagger.json", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

 /**
  * @swagger
  * definition:
  *     Memo:
  *         properties:
  *             text:
  *                 type : string
  *             deadline:
  *                 type : date
  *             file:
  *                 type : buffer
  */

  /**
   * @swagger
   * /memos:
   *    get:
   *        tags:
   *            - Memos
   *        description: Returns all memos
   *        produces:
   *            - application/json
   *        responses:
   *            200:
   *                description: An array of memos
   *                schema:
   *                    $ref: "#/definitions/Memo"
   *    post:
   *        tags:
   *            - Memos
   *        description: Creates a new memo
   *        produces:
   *            - application/json
   *        parameters:
   *            - name: memoData
   *              description: Memo's text, deadline and file to attach
   *              in: body
   *              required: true
   *              schema:
   *                $ref: '#/definitions/Memo'
   *        responses:
   *            200:
   *                description: Successfully created
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

/**
 * @swagger
 * /memos/{id}:
 *   get:
 *     tags:
 *       - Memos
 *     description: Returns a single memo
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Memo's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single memo
 *         schema:
 *           $ref: '#/definitions/Memo'
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
    /**
     * @swagger
     * /memos/{id}:
     *   delete:
     *     tags:
     *       - Memos
     *     description: Deletes a single memo
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Memo's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Successfully deleted
     */
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
