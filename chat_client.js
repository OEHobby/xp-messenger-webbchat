
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
	$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">' + nick + ' säger:</p>' + '<p class="chatMessage">' + message + '</p>');
	$("#chatWindow").scrollTop($("#chatWindow")[0].scrollHeight);
	console.log($("#chatWindow")[0].scrollHeight);
  });

socket.on('greeting', function(msg){
	var nick = msg.split(" ")[2];
	console.log(nick);
	$('#nickName').html(nick);
	$('.program-title').html("MSN Messenger - " + nick  + " - (online)");
});

socket.on('alert', function(msg){
	if(msg.split(":")[0] == "nick")
	{
		$('#nickName').html(msg.split(":")[1]);
		$('.program-title').html("MSN Messenger - " + msg.split(":")[1]  + " - (online)");
	}
});