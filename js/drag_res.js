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

for(var i = 0; i < test.length; i++)
{
    $( '.'+test[i] ).resizable();

    bindResize(".head", '.'+test[i], 0);
    bindResize(".bottomBar", '.'+test[i], 0);
    bindResize(".xp-bar", '.'+test[i], 0);
    bindResize(".nickwrapper", '.'+test[i], 0);
    bindResize(".text-field", '.'+test[i], 0, $(".rightBar").width());
    bindResize(".m", '.'+test[i], 0, $(".rightBar").width());
    bindResize(".smiley-bar", '.'+test[i], 0, $(".rightBar").width());
    bindResize(".chatMessage", '.'+test[i], 0, $(".rightBar").width() + 50);
    bindResize(".chatWindow", '.'+test[i], 2, $(".rightBar").width()+10 , ($(".head").height() + $(".bottomBar").height() + $(".xp-bar").height() + 10) );

    $( '.'+test[i] ).resize(autoScroll);

    $( '.'+test[i] ).draggable({ disabled: true });

    $(".xp-bar").mousedown(function(){
        console.log("drag window; " + test[0]);
        $( '.'+test[0] ).draggable( "option", "disabled", false );
    });
    $(".xp-bar").mouseup(function(){
        $( '.'+test[0] ).draggable( "option", "disabled", true );
    });

    /*to fix bug that appears if you put the window up so the bar doesnt show. */
    $( '.'+test[i] ).mousedown(function(){
        /*if($( '.'+test[i] ).offset().top < 0)
        {
            $( '.'+test[i] ).draggable( "option", "disabled", false );
            $( '.'+test[i] ).draggable( "option", "disabled", true );
        }*/
    });
    var pos = $( '.'+test[i] ).offset();
    //document.getElementById( test[0] ).style.maxWidth = ( $(window).width() - pos.left - xoffset ) + "px";
    //document.getElementById( test[0] ).style.maxHeight = ( $(window).height() - pos.top - yoffset ) + "px";
    $( '.'+test[i] ).css({ "max-height": $(window).height() - pos.top - yoffset + 'px' });
    $( '.'+test[i] ).css({ "max-width": $(window).width() - pos.left + 'px' });

    //restore window is something unexpected happens, like godzilla eats it.
    var start = document.getElementById('start-button');
    start.addEventListener("click", function() {
    	$( '.'+test[0] ).offset({top:0, left:0});
    	});
    start.addEventListener("mouseover", function() {
    	$("#start-tips").removeClass("hide");
    	});
    start.addEventListener("mouseout", function() {
    	$("#start-tips").addClass("hide");
    	});
}
//Online-window

$( "#online-win" ).draggable();