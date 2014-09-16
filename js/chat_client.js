var myNickname = "";
var socket = io();
var onlines = [];

//welcome nick-picker
$('#nick-form').submit(function(){
	console.log("nick-form submit");
	socket.emit('join', $('#nick-picker').val());
	$('#nick-picker').val('');
	return false;
  });

//messages
$('#message-form').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	$("#smiley-picker").addClass('hide');
	return false;
  });


socket.on('join', function(msg){
		console.log(msg.split(":")[1]);
		if(msg.split(":")[1] == '1')
		{
			$('#nick-picker').val('');
			$("#welcome").addClass('hide');
			$("#online-win").removeClass('hide');
			$("#window").removeClass('hide');
			$("#start-menu").removeClass('hide');
		}
		else
		{
			console.log("taken");
			$('#nick-form').html( "<label>Nick taken, choose another one.</label>" + $('#nick-form').html());
			$('#nick-picker').val(myNickname);
			$('#nick-picker').css('background', 'rgba(255,0,0,0.5');
		}
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

socket.on('online', function(msg){
	onlines.push(msg);
	console.log(msg);
	printOnlines();
});

socket.on('disconnect', function(msg){
	console.log("disco: " + msg);
	for(var i in onlines)
	{
		console.log(onlines[i]);
		if(onlines[i] == msg)
		{
			console.log("msg: " + msg);
			onlines.splice(i, 1);
		}
	}
	printOnlines()

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
			$('.program-title').html("MSN Messenger - " + myNickname + " - (online)");
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
				$('#chatWindow').html( $('#chatWindow').html() + '<p class="chatTitle">Boten Anna said:</p>' + '<p class="chatMessage">' + info + ' has logged in.</p>');
				$('.login-win-nick').html(info);
				$('#login-win').removeClass('hide');
				window.setTimeout(function(){
					$('#login-win').addClass('hide');
				}, 5000);
				autoScroll();
				onlines.push(info);
				printOnlines();

				playSound('login');
			}
			break;
		case 'nickChange':
			var oldNick = info.split(",")[0]; //server notifies "oldNick,NewNick"
			var newNick = info.split(",")[1];
			onlines[onlines.indexOf(oldNick)] = newNick;
			printOnlines();
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

function printOnlines()
{
	$('.online-list').html("");
	for(var i in onlines)
	{
		console.log(onlines[i]);
		if(myNickname != onlines[i])
		{
			$('.online-list').html( $('.online-list').html() + '<li>' + createSmileys(onlines[i]) + '</li>');
		}
	}
	if(onlines[0] == undefined)
	{
		$('.online-list').html("<li class='offline'>Noone online :( </li>");
	}
}