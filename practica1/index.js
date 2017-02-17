var server = require("./server.js");
    router = require("./router.js");
    requestHandlers = require("./requestHandlers.js");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

// Ejercicio practica 1
handle["/ejercicio"] = requestHandlers.ejercicio;

server.start(router.route, handle);
