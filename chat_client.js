
var socket = io();
$('form').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
  });

socket.on('chat message', function(msg){
	console.log(msg);
	var nick = msg.split(":")[0];
	console.log("nick: " + nick);
	var message = msg.split(": ")[1];
	$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">' + nick + ' said:</p>' + '<p class="chatMessage">' + message + '</p>');
	$("#chatWindow").scrollTop($("#chatWindow")[0].scrollHeight);
	console.log($("#chatWindow")[0].scrollHeight);
  });

socket.on('greeting', function(msg){
	var nick = msg.split(" ")[0];
	var message = msg.split(": ")[1];
	console.log(nick);
	$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">' + nick + ' said:</p>' + '<p class="chatMessage">' + message + '</p>');
});

socket.on('alert', function(msg){
	var alert = msg.split(":")[0];
	var info = msg.split(":")[1];
	switch(alert)
	{
		case 'nick':
			$('.nickName').html(info);
			$('.program-title').html("MSN Messenger - " + info + " - (online)")
			break;
		case 'chatters':
			$('.nickStatus').html("It is: " + info + " online right now.");
			break;
	}
});