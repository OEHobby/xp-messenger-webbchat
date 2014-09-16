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

var test = [];
test.push("window");

$( '#'+test[0] ).resizable();

bindResize("#head", '#'+test[0], 0);
bindResize("#bottomBar", '#'+test[0], 0);
bindResize("#xp-bar", '#'+test[0], 0);
bindResize("#nickwrapper", '#'+test[0], 0);
bindResize("#text-field", '#'+test[0], 0, $("#rightBar").width());
bindResize("#m", '#'+test[0], 0, $("#rightBar").width());
bindResize("#smiley-bar", '#'+test[0], 0, $("#rightBar").width());
bindResize(".chatMessage", '#'+test[0], 0, $("#rightBar").width() + 50);
bindResize("#chatWindow", '#'+test[0], 2, $("#rightBar").width()+10 , ($("#head").height() + $("#bottomBar").height() + $("#xp-bar").height() + 10) );

$( '#'+test[0] ).resize(autoScroll);

$( '#'+test[0] ).draggable({ disabled: true });

$("#xp-bar").mousedown(function(){
    console.log("drag window");
    $( '#'+test[0] ).draggable( "option", "disabled", false );
});
$("#xp-bar").mouseup(function(){
    $( '#'+test[0] ).draggable( "option", "disabled", true );
});

/*to fix bug that appears if you put the window up so the bar doesnt show. */
$( '#'+test[0] ).mousedown(function(){
    if($( '#'+test[0] ).offset().top < 0)
    {
        $( '#'+test[0] ).draggable( "option", "disabled", false );
        $( '#'+test[0] ).draggable( "option", "disabled", true );
    }
});
var pos = $( '#'+test[0] ).offset();
//document.getElementById( test[0] ).style.maxWidth = ( $(window).width() - pos.left - xoffset ) + "px";
//document.getElementById( test[0] ).style.maxHeight = ( $(window).height() - pos.top - yoffset ) + "px";
$( '#'+test[0] ).css({ "max-height": $(window).height() - pos.top - yoffset + 'px' });
$( '#'+test[0] ).css({ "max-width": $(window).width() - pos.left + 'px' });

//restore window is something unexpected happens, like godzilla eats it.
var start = document.getElementById('start-button');
start.addEventListener("click", function() {
	$( '#'+test[0] ).offset({top:0, left:0});
	});
start.addEventListener("mouseover", function() {
	$("#start-tips").removeClass("hide");
	});
start.addEventListener("mouseout", function() {
	$("#start-tips").addClass("hide");
	});

//Online-window

$( "#online-win" ).draggable();