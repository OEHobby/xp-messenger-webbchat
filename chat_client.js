
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
	msg = msg.split(": ")[1];
	msg = msg.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    });
    msg = createSmileys(msg);
	$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">' + nick + ' said:</p>' + '<p class="chatMessage">' + msg + '</p>');
	autoScroll();
	console.log($("#chatWindow")[0].scrollHeight);
  });

socket.on('greeting', function(msg){
	$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">Boten Anna said:</p>' + '<p class="chatMessage">' + msg + '.</p>');
	autoScroll()
});

socket.on('privmsg', function(msg){
	console.log("got a priv message from " + nick);
	var nick = msg.split(":")[0];
	msg = msg.split(": ")[1];
	msg = msg.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    });
	$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">' + nick + ' said in private:</p>' + '<p class="chatMessage">' + msg + '.</p>');
	autoScroll()
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
			$('.nickStatus').html("It's " + info + " online right now.");
			break;
		case 'nudge':
			nudge(10);
			break;
	}
});

function autoScroll()
{
	$("#chatWindow").scrollTop($("#chatWindow")[0].scrollHeight);
}
