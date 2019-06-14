var connection = $.hubConnection("http://mfo314ji1lo2.azurewebsites.net/signalr");

var contosoChatHubProxy = connection.createHubProxy('ProcessKillerHub');
// function server can call
contosoChatHubProxy.on('SetProcessAtClient', function(userName) {
    console.log(userName);
});
connection.start({ jsonp: true })
    .done(function(){
        console.log('Now connected, connection ID=' + connection.id);
        // // server calling
        // $('#signalRWebId').val(connection.id);
        // let appId = getCookie("au");
        // if (!appId) {
        //
        // } else {
        //     $('#signalRAppId').val(appId);
        // }
        // contosoChatHubProxy.invoke('KillProcess', ["explorer","Word","Task Manager"]);
    })
    .fail(function(){ console.log('Could not connect'); });