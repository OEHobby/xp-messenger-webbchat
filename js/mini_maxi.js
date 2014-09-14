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
var isMaximized = false;

var maxi = document.getElementById("maximize-button");
maxi.addEventListener("click", function(){
	if(!isMaximized)
	{
		saveWindow();
		maximizeWindow(offset);
		isMaximized = true;
	}
	else
	{
		restoreWindow();
		isMaximized = false;
	}
	    
});

function maximizeWindow(offset)
{
	saveWindow();
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
	autoScroll();
}

//define all the variabbles needed for the save/restore feature
var winWidth;
var winHeight;
var headWidth;
var bottomBarWidth;
var xpBarWidth;
var nickWrapperWidth;
var textfieldWidth;
var mWidth;
var smileyBarWidth;
var chatWindowWidth;
var chatWindowHeight;
var rightBarHeight;

var windowPosX;
var windowPosY;

function saveWindow()
{
	winWidth = $("#window").width();
	winHeight = $("#window").height();
	headWidth = $("#head").width();
	bottomBarWidth = $("#bottomBar").width();
	xpBarWidth = $("#xp-bar").width();
	nickWrapperWidth = $("#nickwrapper").width();
	textfieldWidth = $("#text-field").width();
	mWidth = $("#m").width();
	smileyBarWidth = $("#smiley-bar").width();
	chatWindowWidth = $("#chatWindow").width();
	chatWindowHeight = $("#chatWindow").height();
	rightBarHeight = $("#right-bar").height();

	windowPosX = $("#window").offset().left;
	windowPosY = $("#window").offset().top;
}

function restoreWindow()
{
	$("#window").width(winWidth);
	$("#window").height(winHeight);
	$("#head").width(headWidth);
	$("#bottomBar").width(bottomBarWidth);
	$("#xp-bar").width(xpBarWidth);
	$("#nickwrapper").width(nickWrapperWidth);
	$("#text-field").width(textfieldWidth);
	$("#m").width(mWidth);
	$("#smiley-bar").width(smileyBarWidth);
	$("#chatWindow").width(chatWindowWidth);
	$("#chatWindow").height(chatWindowHeight);
	$("#right-bar").height(rightBarHeight);

	$("#window").offset({ top: windowPosY, left: windowPosX });
	autoScroll();
}