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

var maxi = document.getElementById("maximize-button");
maxi.addEventListener("click", function(){maximize();});

function maximize()
{
	//maximize window
	$("#window").width($(window).width() - 12);
	$("#window").height($(window).height() - 10);
	$("#window").offset({top:0, left:0});
	//maximize head, xp-bar, bottom, textfield, smiley-bar
	$("#head").width($(window).width() - 12);
	$("#bottomBar").width($(window).width() - 12);
	$("#xp-bar").width($(window).width() - 12);
	$("#nickwrapper").width($(window).width() - 12);

	$("#text-field").width( $(window).width() - $("#rightBar").width()  - 12);
	$("#text-field input[type=text]").width( $(window).width() - $("#rightBar").width()  - 12) ;
	$("#smiley-bar").width( $(window).width() - $("#rightBar").width() - 12);
	$("#chatWindow").width( $(window).width() - $("#rightBar").width()  - 12);
	$("#chatWindow").height( $(window).height() - ($("#head").height() + $("#bottomBar").height() + $("#xp-bar").height())  - 10);
	$("#right-bar").height($(window).height() - 10);

}
