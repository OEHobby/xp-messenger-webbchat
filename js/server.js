var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chatters = 0;
var lastNudge = 0;

app.get('/', function(req, res){
    res.sendFile('/var/www/chat/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  init(io, socket);

  socket.on('chat message', function(msg){ 
  		handleMessage(io, socket, msg);
  	});
  
  socket.on('join', function(msg){
    joinChat(io, socket, msg);
  });

  socket.on('disconnect', function(){
      disconnect(io, socket);
    });

});

function init(io, socket)
{
  chatters += 1;
  if(nickTaken("MSNLover" + chatters))
  {
    socket.nickname = "MSNLover" + Math.floor((Math.random() * 100)) + chatters;
  }
  else
  {
    socket.nickname = "MSNLover" + chatters;
  }

  console.log('user: ' + socket.id + " connected and is called " + socket.nickname + ". IP: " + socket.handshake.address);
  io.emit('notify', 'chatters:' + chatters);
  console.log(chatters);
  socket.emit('notify', 'nick:' + socket.nickname);

  var clients = findClientsSocket();
  for(var i in clients)
  {
    if(socket.nickname != clients[i].nickname)
    {
      console.log("emits to: ", socket.nickname + ": " + clients[i].nickname);
      socket.emit('online', clients[i].nickname);
    }
  }
}

function disconnect(io, socket)
{
  chatters -= 1;
  io.emit('notify', 'chatters:' + chatters);
  io.emit('greeting', socket.nickname + " has logged out.");
  io.emit('disconnect', socket.nickname);
  console.log(socket.nickname + ' disconnected');
}

function handleMessage(io, socket, msg)
{
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
              changeNick(io, socket, newNick);
            }
            break;
          case '!help':
            msg = 'Change nick with /nick nick eg. /nick oskar. Features: resize, move and mini/maximize/restore the chat-window. ';
            msg += 'Send nudges to everyone, mute the sound (down at the clock). Choose smileys from the menu.';
            msg += 'Press Start to reset window position. Press a display picture to change to random new one. <a href="https://github.com/OEHobby/xp-messenger-webbchat" target="_blank">Project on Git</a>';
            socket.emit('greeting', msg);
            break;
          case '!send':
            var widget = createSpotifyWidget(msg);
            if(widget != 0)
            {
              widget = socket.nickname + ": " + widget;
              io.emit('chat message', widget);
            }
            break;
          case '!nudge':
            console.log("lastNudge: " + lastNudge);
            if((new Date().getTime() - lastNudge) > 1000)
            {
              io.emit('notify', "nudge");
              lastNudge = new Date().getTime(); 
            }
            break;
          case '/msg':
            privMsg(socket, msg);
            break;
        }
      }

      else
      {
        if(msg != "" && msg != " ")
        {
          /*if(isLink(msg))
          {
            msg = createLink(msg);
          }*/
          msg = socket.nickname + ": " + msg;
          io.emit('chat message', msg);
          console.log(msg);
        }
    }
}
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

function changeNick(io, socket, nick)
{
  var found = false;
	var clients = findClientsSocket();
	for (var i = 0; i < clients.length && !found; i++) 
	{
		console.log("searching for: " + socket.id + " found: " + clients[i].id);
		if(clients[i].id == socket.id)
		{
      found = true;
			if(!nickTaken(nick) && nick.length > 2 && nick.length < 20)
			{
            clients[i].emit('notify', 'nick:' + nick);
        		console.log(clients[i].id + "is now: " + clients[i].nickname);
            io.emit('notify', "nickChange:" + clients[i].nickname + "," + nick);
            io.emit('greeting', clients[i].nickname + " is now known as: " + nick);
            clients[i].nickname = nick;
        	}
        	else
        	{
        	console.log("nick taken");
        	}
        }
    }
}

function joinChat(io, socket, msg)
{
  var nick = msg.split(" ")[0];
  console.log(nick);
  var found = false;
  var clients = findClientsSocket();
  for (var i = 0; i < clients.length && !found; i++) 
  {
    console.log("searching for: " + socket.id + " found: " + clients[i].id);
    if(clients[i].id == socket.id)
    {
      found = true;
      if(!nickTaken(nick) && nick.length > 2 && nick.length < 20)
      {
        clients[i].emit('notify', 'nick:' + nick);
        console.log(clients[i].id + "was: " + clients[i].nickname);
        io.emit('notify', "newChatter:" + nick);
        clients[i].nickname = nick;
        console.log(clients[i].id + " is now " + clients[i].nickname);
        clients[i].emit('join', 'ok:1');
        socket.emit('greeting', 'Hey there, ' + clients[i].nickname + '. Welcome to this nostalgia trip! You can change your nick with /nick nick. Say !help at any time for more info.');
      }
      else
      {
        console.log("nick taken");
        clients[i].emit('join', 'ok:no');
        console.log("emit to " + clients[i].nickname);
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
    if(clients[i].nickname != undefined)
    {
  		if(clients[i].nickname.toLowerCase() == nick.toLowerCase())
  		{
  			console.log(clients[i].nickname + " is same as " + nick);
  			bool = true;
  		}
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
/*
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
  console.log("linkstart: " + linkStart);
  console.log("found one link");
  linkEnd = msg.indexOf(" ", linkStart);
  console.log("linkend: " + linkEnd);
  link = msg.slice(linkStart, (linkEnd+1));
  console.log(link);
  msg = msg.replace(link, "<a href=''" + link + "'' target='_blank'>" + link + "</a>");

  return msg;
}
*/
function createSpotifyWidget(msg)
{
  var widget = 0;
  var id = "";
  if(msg.indexOf("spotify.com/track/") > -1)
  {
    id = msg.split("spotify.com/track/")[1];
  }

  else if(msg.indexOf("spotify:track:") > -1)
  {
    id = msg.split("spotify:track:")[1];
  }

  if(id.split(" ")[0])
  {
     id = id.split(" ")[0];
  }

  console.log(id);
  if(id != "")
  {
    widget = "<iframe src='https://embed.spotify.com/?uri=spotify:track:" + id + "' width='500px' height='80px' frameborder='0' allowtransparency='true'></iframe>";
  }

  return widget;
}

function privMsg(socket, msg, namespace)
{
  var clients = findClientsSocket();
  var ns = io.of(namespace ||"/");

  var nick = msg.split(" ")[1];
  msg = msg.slice( msg.indexOf(msg.split(" ")[2]), msg.length );
  

  if(ns)
  {
    for (var i in clients)
    {
      if(clients[i].nickname == nick)
      {
        console.log(clients[i].nickname + " got a priv msg from " + socket.nickname);
        clients[i].emit('privmsg', socket.nickname + ": " + msg);
      }
    }
  }
}