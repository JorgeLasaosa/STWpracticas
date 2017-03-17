var appRouter = function(app) {
 
	app.get("/", function(req, res) {
	    res.send("Hola mundo!");
	});

	app.get("/account", function(req, res) {
	    var accountMock = {
	        "username": "jfabra",
	        "password": "1234",
	        "twitter": "@jfabra"
	    }
	    if(!req.query.username) {
	        return res.send({"status": "error", "message": "Falta el username"});
	    } else if(req.query.username != accountMock.username) {
	        return res.send({"status": "error", "message": "Error en el username"});
	    } else {
	        return res.send(accountMock);
	    }
	});
app.post("/account", function(req, res) {
    if(!req.body.username || !req.body.password || !req.body.twitter) {
        return res.send({"status": "error", "message": "Falta un parámetro"});
    } else {
        return res.send(req.body);
    }
});

app.put("/account", function(req, res) {
        console.log("Petición PUT al API..");
        return res.send("{status: ok}");
});

app.delete("/account", function(req, res) {
        console.log("Petición DELETE al API..");
        return res.send("{status: ok}");
});

}
 
module.exports = appRouter;

