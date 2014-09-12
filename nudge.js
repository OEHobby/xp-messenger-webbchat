function moveWindow(jump, dir)
{
	if(dir == "right")
	{
		$("#window").offset({ top: $("#window").position().top, left: ($("#window").position().left + jump) });
		console.log("moving right.");
	}
	else if(dir == "left")
	{
		$("#window").offset({ top: $("#window").position().top, left: ($("#window").position().left - jump) });
		console.log("moving left.");
	}
	else if(dir == "up")
	{
		$("#window").offset({ top: ($("#window").position().top - jump), left: $("#window").position().left });
		console.log("moving up.");
	}
	else if(dir == "down")
	{
		$("#window").offset({ top: ($("#window").position().top + jump), left: $("#window").position().left });
		console.log("moving down.");
	}
}

function nudge(jump)
{
	console.log("vibbar");
	setTimeout(function(){moveWindow(jump, "left");}, 50);
	setTimeout(function(){moveWindow(jump, "up");}, 30);
	setTimeout(function(){moveWindow(jump, "right");}, 80);
	setTimeout(function(){moveWindow(jump, "down");}, 70);
	setTimeout(function(){moveWindow(jump, "left");}, 60);
	setTimeout(function(){moveWindow(jump, "up");}, 20);
	setTimeout(function(){moveWindow(jump, "right");}, 75);
	setTimeout(function(){moveWindow(jump, "down");}, 65);

	setTimeout(function(){moveWindow(jump, "left");}, 68);
	setTimeout(function(){moveWindow(jump, "up");}, 72);
	setTimeout(function(){moveWindow(jump, "right");}, 85);
	setTimeout(function(){moveWindow(jump, "down");}, 28);
	setTimeout(function(){moveWindow(jump, "left");}, 91);
	setTimeout(function(){moveWindow(jump, "up");}, 45);
	setTimeout(function(){moveWindow(jump, "right");}, 35);
	setTimeout(function(){moveWindow(jump, "down");}, 55);
}

var vibber = document.getElementById('smiley-symbol-vibb');
vibber.addEventListener("click", function() {
		//nudge(10);nudge(10);nudge(10);
		$("#m").val('!nudge');
		$("form").submit();
});