/**
 * JustChat-Web
 *
 * @link https://github.com/brian978/JustChat-Web
 * @copyright Copyright (c) 2014
 * @license Creative Commons Attribution-ShareAlike 3.0
 */
var fs = require('fs');
var cfg = {
    ssl: true,
    port: 7896,
    ssl_key: './certs/server.key',
    ssl_cert: './certs/server.crt'
};

var httpServ = ( cfg.ssl ) ? require('https') : require('http');
var WebSocketServer = require('ws').Server;
var app = null;

if (cfg.ssl) {
    app = httpServ.createServer({
        key: fs.readFileSync(cfg.ssl_key),
        cert: fs.readFileSync(cfg.ssl_cert)
    });
} else {
    app = httpServ.createServer();
}

app.listen(cfg.port);

var server = new WebSocketServer({server: app});

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
        console.log("Received message: " + message);
        server.broadcast(ws, message);
    });

    ws.on("close", function () {
        console.log('disconnected');
    });
});
