var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res)
{
  res.sendFile(__dirname + '/index.html');
});
users = [];
io.on('connection', function(socket){
  console.log('user is connected');
  socket.on('setUserName', function(data){
    if(users.indexOf(data) > -1){
      socket.emit('userExists', data + ' username exists, please try a diff username.');
    } else {
      users.push(data);
      socket.emit('userSet', {username: data});
    }
});

  socket.on('msg', function(data){
    io.sockets.emit('newmsg', data);
  })
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});