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
  	chatters++;
    socket.nickname = "MSNLover" + chatters;
   	console.log('user: ' + socket.id + " connected and is called " + socket.nickname + ". IP: " + socket.handshake.address);
   	socket.emit('greeting', 'Hey there, ' + socket.nickname + '. Welcome to this nostalgia trip! You can change your nick with /nick nick. Say !help at any time for more info.');
    io.emit('alert', 'chatters:' + chatters);
    console.log(chatters);
    socket.emit('alert', 'nick:' + socket.nickname);
    io.emit('greeting', socket.nickname + " has joined the chat.");

  	socket.on('disconnect', function(){
      chatters--;
      io.emit('alert', 'chatters:' + chatters);
      console.log(socket.nickname + ' disconnected');
    });

socket.on('chat message', function(msg){ 
		var msg = msg.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
   			return '&#'+i.charCodeAt(0)+';';
		});
      if(isLink(msg))
      {
        msg = createLink(msg);
      }
  		console.log("the split: " + msg.split(" ")[0]);
  		var firstChar = msg.charAt(0);
  		if(isCommand(firstChar))
  		{
        var cmd = msg.split(" ")[0];
  			switch(cmd)
  			{
  				case '/nick':
  					var newNick = msg.split(" ")[1];
            if(newNick != undefined)
            {
              changeNick(socket, newNick);
            }
  					break;
          case '!help':
            msg = 'Change nick with /nick nick, you can resize, move (click and drag on the blue bar) and mini/maximize window and nudge. Press Start to reset window position. Press a display picture to change to random new one. Git: <a href="https://github.com/OEHobby/xp-messenger-webbchat" target="_blank">xp-messenger-webbchat</a>';
            socket.emit('greeting', msg);
  			}
  		}

  		else
  		{
  			if(msg != "" && msg != " ")
  			{
  				msg = socket.nickname + ": " + msg;
				io.emit('chat message', msg);
				console.log(msg);
			}
		}
	});
});

function isCommand(string)
{
	var cmds = ["/", "!"];
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
        }
    }
    return res;
}

function isLink(msg)
{
  var bool = false;
  if( msg.indexOf("http://") > -1)
  {
    bool = true;
    console.log("found http://");
  }
  return bool;
}

function createLink(msg) //fix problem with the need of space after link. Fix more than one link.
{
  var linkStart;
  var link;
  var linkEnd = 0;
  linkStart = msg.indexOf("http://");
  console.log("found one link");
  linkEnd = msg.indexOf(" ", linkStart);
  link = msg.slice(linkStart, (linkEnd+1));
  console.log(link);
  msg = msg.replace(link, "<a href='" + link + "'>" + link + "</a>");

  return msg;
}