var minimize = document.getElementById("minimize-button");
minimize.addEventListener("click", function(){ console.log("klick"); $("#window").addClass("hide"); });

var pickup = document.getElementById("messenger-mini");
pickup.addEventListener("click", function(){ 
	console.log("klick"); 

	//$("#window").removeClass("hide"); 
	var classList = $('#window').attr('class').split(/\s+/);
	$.each( classList, function(index, item)
	{
    	if (item === 'hide') 
    	{
       		$("#window").removeClass("hide");
    	}
    	else
    	{
    		$("#window").addClass("hide");
    	}
    });
});

var offset = 7;
var maxi = document.getElementById("maximize-button");
maxi.addEventListener("click", function(){maximize(offset);});

function maximize(offset)
{
	//maximize window
	$("#window").width($(window).innerWidth() - offset);
	$("#window").height($(window).innerHeight() - offset);
	$("#window").offset({top:0, left:0});
	//maximize head, xp-bar, bottom, textfield, smiley-bar
	$("#head").width($(window).width() - offset);
	$("#bottomBar").width($(window).width() - offset);
	$("#xp-bar").width($(window).width() - offset);
	$("#nickwrapper").width($(window).width() - offset);

	$("#text-field").width( $(window).width() - $("#rightBar").width()  - offset);
	$("#m").width( $(window).width() - $("#rightBar").width()  - offset) ;
	$("#smiley-bar").width( $(window).width() - $("#rightBar").width() - offset);
	$("#chatWindow").width( $(window).width() - $("#rightBar").width()  - (offset + 10));
	$("#chatWindow").height( $(window).height() - ($("#head").height() + $("#bottomBar").height() + $("#xp-bar").height() + 17) );
	$("#right-bar").height($(window).height() - offset);

}