var server = require("./server.js");
    router = require("./router.js");
    requestHandlers = require("./requestHandlers.js");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/setMemo"] = requestHandlers.setMemo;

server.start(router.route, handle);
