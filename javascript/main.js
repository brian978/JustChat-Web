requirejs.config({
    baseUrl: "javascript/module",
    paths: {
        jquery: "../vendor/jquery"
    }
});

requirejs(["jquery", "Lib/MessageBox"], function ($, MessageBox) {
    $(function () {
        var socket = new WebSocket("wss://127.0.0.1:7896");
        var messageBox = new MessageBox($("#chat-box"));
        var messageInput = $("#message");

        socket.onopen = function () {
            console.log("connected to server");
        };

        socket.onmessage = function (message) {
            messageBox.addMessage("From other: " + message.data);
        };

        socket.onerror = function () {
            alert("An error has occurred");
        };

        $("#message-box").find("button").on("click", function(){
            var message = messageInput.val();
            messageBox.addMessage("From me: " + message);
            socket.send(message);

            // Resetting the contents of the box
            messageInput.val("");
        });

        messageInput.on("keydown", function (e) {
            if (e.which == 13) {
                var message = $(this).val();
                messageBox.addMessage("From me: " + message);
                socket.send(message);

                // Resetting the contents of the box
                $(this).val("");
            }
        });
    });
});





