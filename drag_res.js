function bindResize(id, parent, dir, offset1, offset2) //dir(0 = w, 1 = h, 2 = both), if width OR height offset1 = either. if both dir, offset1 is width
{
	if(dir == 0) //bind to width
	{
		$('' + parent).bind("resize", function (event, ui) {
            var newWidth = $(parent).width();
            if(offset1 !== undefined)
            {
            	$('' + id).width(newWidth - offset1);
            }
            else
            {
            	$('' + id).width(newWidth);
            }
        });
	}
	else if(dir == 1) // bind to height
	{
		$('' + parent).bind("resize", function (event, ui) {
            newHeight = $('' + parent).height();
            $(id).height(newHeight - offset1);
        });
    }
    else if(dir == 2)
    {
    	$('' + parent ).bind("resize", function (event, ui) {
    		newHeight = $('' + parent).height();
    		var newWidth = $('' + parent).width();
			$('' + id).width(newWidth - offset1);
        	$('' + id).height(newHeight - offset2);
       	});
    }
}

$( "#window" ).resizable();
bindResize("#head", "#window", 0);
bindResize("#bottomBar", "#window", 0);
bindResize("#xp-bar", "#window", 0);
bindResize("#nickwrapper", "#window", 0);
bindResize("#text-field", "#window", 0, $("#rightBar").width());
bindResize("#m", "#window", 0, $("#rightBar").width());
bindResize("#smiley-bar", "#window", 0, $("#rightBar").width());
bindResize(".chatMessage", "#window", 0, $("#rightBar").width() + 50);
bindResize("#chatWindow", "#window", 2, $("#rightBar").width()+10 , ($("#head").height() + $("#bottomBar").height() + $("#xp-bar").height() + 10) );

$( "#window" ).draggable({ disabled: true });

var xpbar = document.getElementById('xp-bar');
xpbar.addEventListener("mousedown", function() {
	$( "#window" ).draggable( "option", "disabled", false );
});
xpbar.addEventListener("mouseup", function() {
	$( "#window" ).draggable( "option", "disabled", true );
});

/*to fix bug that appears if you put the window up so the bar doesnt show. 
only with mouse up since you should be able to move it down again*/
var win = document.getElementById('window');
win.addEventListener("mouseup", function() {
	$( "#window" ).draggable( "option", "disabled", true );
});

var pos = $('#window').offset();
document.getElementById("window").style.maxWidth = ( $(window).width() - pos.left - offset ) + "px";
document.getElementById("window").style.maxHeight = ( $(window).height() - pos.top - offset ) + "px";


//restore window is something unexpected happens, like godzilla eats it.
var start = document.getElementById('start-button');
start.addEventListener("click", function() {
	$("#window").offset({top:0, left:0});
	});
start.addEventListener("mouseover", function() {
	$("#start-tips").removeClass("hide");
	});
start.addEventListener("mouseout", function() {
	$("#start-tips").addClass("hide");
	});