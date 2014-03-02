/**
 * JustChat-Web
 *
 * @link https://github.com/brian978/JustChat-Web
 * @copyright Copyright (c) 2014
 * @license Creative Commons Attribution-ShareAlike 3.0
 */

var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 7896});

server.broadcast = function (sender, data) {
    for (var i in this.clients) {
        if (this.clients.hasOwnProperty(i) && this.clients[i] !== sender) {
            this.clients[i].send(data);
        }
    }
};

server.on("connection", function (ws) {
    console.log("client connected");

    ws.on("message", function (message) {
        server.broadcast(ws, message);
    });

    ws.on("close", function () {
        console.log('disconnected');
    });
});
