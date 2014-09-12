var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chatters = 0;

app.get('/', function(req, res){
  res.sendFile('/var/www/chat/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
    var address = socket.handshake.address;

  	socket.nickname = "MSNLover" + chatters;
  	chatters++;
   	console.log('user: ' + socket.id + " connected and is called " + socket.nickname + ". IP: " + address.address);
   	socket.emit('greeting', 'GlaDos: Howdy, ' + socket.nickname + ' . Welcome to this nostalgia trip! You change your nick with /nick nick');

  	socket.on('disconnect', function(){
    console.log('user disconnected');
  });

socket.on('chat message', function(msg){ 
		var msg = msg.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
   			return '&#'+i.charCodeAt(0)+';';
		});
		console.log(socket.nickname);
  		console.log(msg);
  		console.log("the split: " + msg.split(" ")[0]);
  		var firstWord = msg.split(" ")[0];
  		if(isCommand(firstWord))
  		{
  			switch(firstWord)
  			{
  				case '/nick':
  					var newNick = msg.split(" ")[1];
  					changeNick(socket, newNick);
  					break;
  			}
  		}

  		else
  		{
  			if(msg != "" && msg != " ")
  			{
  				msg = socket.nickname + ": " + msg;
				io.emit('chat message', msg);
				console.log('message: ' + msg);
			}
		}
	});
});

function isCommand(string)
{
	var cmds = ["/nick", "/msg"];
	var bool = false;
	if( cmds.indexOf(string) != -1 )
	{
		bool = true;
	}
	return bool;
}

function changeNick(socket, nick)
{
	var clients = findClientsSocket();
	for (var i in clients) 
	{
		console.log("searching for: " + socket.id + " found: " + clients[i].id);
		if(clients[i].id == socket.id)
		{
			if(!nickTaken(nick) && nick.length > 2 && nick.length < 20)
			{
        		clients[i].nickname = nick;
            clients[i].emit('alert', 'nick:' + nick);
        		console.log(clients[i].id + "is now: " + clients[i].nickname);
        	}
        	else
        	{
        	console.log("nick taken");
        	}
        }
    }
}

function nickTaken(nick)
{
	var bool = false;
	var clients = findClientsSocket();
	for(var i in clients)
	{
		if(clients[i].nickname == nick)
		{
			console.log(clients[i].nickname + " is same as " + nick);
			bool = true;
		}
	}
	return bool;
}

function findClientsSocket(roomId, namespace) {
    var res = [];
    var ns = io.of(namespace ||"/");    // the default namespace is "/"

    if(ns) 
    {
        for (var i in ns.connected) 
        {
            res.push(ns.connected[i]);
            console.log("Found: " + ns.connected[i].nickname);
        }
    }
    return res;
}

