/* eslint-disable quotes, no-undef, no-unused-vars, no-console */
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});

var messages = [];

console.log('websockets server started');

ws.on('connection', function(socket){
  console.log('client connection established');

  messages.forEach(function(msg){
    socket.send(msg);
  });

  socket.on('message', function(data){
    console.log('message received: ' + data);
    //Topic command
    //Check sent message for a command (in this case, /topic)
    if(data.substring(0,6) === '/topic'){
      ws.clients.forEach(function(clientSocket){
        clientSocket.send('*** Topic has changed to \''+ data.substring(7)+'\'');
      });
      messages.unshift('*** Topic is \''+data.substring(7)+'\'');
    }
    else{
      messages.push(data);
      ws.clients.forEach(function(clientSocket){
        clientSocket.send(data);
      });
    }
  });
});
