var sound = true;
$('.clock-symbol-1').click(function(){
	sound = false;
	$(this).addClass('clock-symbol-1-mute');
	$(this).removeClass('clock-symbol-1');
});

$('.clock-symbol-1-mute').click(function(){
	sound = true;
	$(this).removeClass('clock-symbol-1-mute');
	$(this).addClass('clock-symbol-1');
});

var messageAudio = new Audio('audio/message.mp3');

function playSound(type)
{
	switch(type)
	{
		case 'message':
			messageAudio.play();
			break;
	}
}