var sound = true;
$('#sound-button').click(function(){
	var classList = $('#sound-button').attr('class').split(/\s+/);
	$.each( classList, function(index, item)
	{
    	if (item === 'clock-symbol-1-mute') 
    	{
    		$("#sound-button").addClass("clock-symbol-1");
       		$("#sound-button").removeClass("clock-symbol-1-mute");
       		sound = true;
       		console.log("unmute");
    	}
    	else if(item === 'clock-symbol-1')
    	{
    		$("#sound-button").addClass("clock-symbol-1-mute");
    		$("#sound-button").removeClass("clock-symbol-1");
    		sound = false;
    		console.log("mute");
    	}
    });
});




function playSound(type)
{
	if(sound)
	{
		switch(type)
		{
			case 'message':
				var audio = new Audio('//root.oskaremilsson.se/chat/audio/message.mp3');
				if(!$(".m").is(":focus"))
				{
					audio.play();
				}
				break;
			case 'nudge':
				var audio = new Audio('//root.oskaremilsson.se/chat/audio/nudge.mp3');
				audio.play();
				break;
			case 'login':
				var audio = new Audio('//root.oskaremilsson.se/chat/audio/login.mp3');
				audio.play();
				break;
			case 'startup':
				var audio = new Audio('//root.oskaremilsson.se/chat/audio/startup.mp3');
				audio.play();
				break;
		}
	}
}