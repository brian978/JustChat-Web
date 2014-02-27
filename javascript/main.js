$(function () {
    var socket = new WebSocket("wss://127.0.0.1:5050");
    var username = "JustChat-Bot";
    var chatBox = $("#chat-box");

    $("#message").on("keydown", function (e) {
        if (e.which == 13) {
            chatBox.val(chatBox.val() + $(this).val());
            $(this).val("");
        }
    });
});



