var connection = $.hubConnection("/signalr");

var contosoChatHubProxy = connection.createHubProxy('ProcessKillerHub');
// function server can call
contosoChatHubProxy.on('addContosoChatMessageToPage', function(userName) {
});
connection.start({ jsonp: true })
    .done(function(){
        connection.id = $('#studentCode').text();
        // server calling
        contosoChatHubProxy.invoke('KillProcess', ["explorer","DKM"]);
    })
    .fail(function () {
    });