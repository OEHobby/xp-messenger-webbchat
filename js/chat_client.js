var myNickname = "";
var socket = io();
$('form').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	$("#smiley-picker").addClass('hide');
	return false;
  });

socket.on('chat message', function(msg){
	console.log(msg);
	var nick = msg.split(": ")[0];
	console.log("nick: " + nick);
	msg = msg.slice(msg.indexOf(": ")+2, msg.length); //message is from : and to the end.
	msg = secureString(msg);
    nick = secureString(nick);
    if(myNickname != nick)
	{
		console.log(myNickname + ", " + nick);
		playSound("message");
	}
    msg = createSmileys(msg);
    nick = createSmileys(nick);
	$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">' + nick + ' said:</p>' + '<p class="chatMessage">' + msg + '</p>');
	autoScroll();
	console.log($("#chatWindow")[0].scrollHeight);
  });

socket.on('greeting', function(msg){
	msg = createSmileys(msg);
	$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">Boten Anna said:</p>' + '<p class="chatMessage">' + msg + '.</p>');
	autoScroll();
});

socket.on('privmsg', function(msg){
	console.log("got a priv message from " + nick);
	var nick = msg.split(": ")[0];
	msg = msg.slice(msg.indexOf(": ")+2, msg.length);
	msg = secureString(msg);
	nick = secureString(nick);
    msg = createSmileys(msg);
    nick = createSmileys(nick);
	$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">' + nick + ' said in private:</p>' + '<p class="chatMessage">' + msg + '.</p>');
	autoScroll()
});

socket.on('notify', function(msg){
	var notify = msg.split(":")[0];
	var info = msg.slice(msg.indexOf(":")+1, msg.length);
	switch(notify)
	{
		case 'nick':
			myNickname = info;
			$('.nickName').html(myNickname);
			$('.program-title').html("MSN Messenger - " + myNickname + " - (online)")
			break;
		case 'chatters':
			$('.nickStatus').html("It's " + info + " online right now.");
			break;
		case 'nudge':
			nudge(10);
			playSound('nudge');
			break;
		case 'newChatter':
			if(myNickname != info)
			{
				$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">Boten Anna said:</p>' + '<p class="chatMessage">' + info + ' has joined the chat.</p>');
				autoScroll();
				playSound('login');
			}
			break;
	}
});

function autoScroll()
{
	$("#chatWindow").scrollTop($("#chatWindow")[0].scrollHeight);
}

function secureString(str)
{
	return str.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        		return '&#'+i.charCodeAt(0)+';';
   			});
}