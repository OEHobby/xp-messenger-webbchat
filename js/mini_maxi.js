$('.minimize-button').click(function(){$(".window").addClass("hide");});

$('#messenger-mini').click(function(){
	var classList = $('.window').attr('class').split(/\s+/);
	$.each( classList, function(index, item)
	{
    	if (item === 'hide') 
    	{
       		$(".window").removeClass("hide");
    	}
    	else
    	{
    		$(".window").addClass("hide");
    	}
    });
});

$('#online-minimize-button').click(function(){
	$("#online-win").addClass("hide");
});

$('#online-win-mini').click(function(){ 
	console.log("klick"); 
	var classList = $('#online-win').attr('class').split(/\s+/);
	$.each( classList, function(index, item)
	{
    	if (item === 'hide') 
    	{
       		$("#online-win").removeClass("hide");
    	}
    	else
    	{
    		$("#online-win").addClass("hide");
    	}
    });
});

var xoffset = 2;
var yoffset = $('.xp-bar').outerHeight()+1;
var isMaximized = false;

$('.maximize-button').click(function(){
	if(!isMaximized)
	{
		saveWindow();
		maximizeWindow(xoffset, yoffset);
		isMaximized = true;
	}
	else
	{
		restoreWindow();
		isMaximized = false;
	}
	    
});

function maximizeWindow(xoffset, yoffset)
{
	saveWindow();
	//maximize window
	$(".window").width($(window).innerWidth() - xoffset);
	$(".window").height($(window).innerHeight() - yoffset);
	$(".window").offset({top:0, left:0});
	//maximize head, xp-bar, bottom, textfield, smiley-bar
	$(".head").width($(window).width() - xoffset);
	$(".bottomBar").width($(window).width() - xoffset);
	$(".xp-bar").width($(window).width() - xoffset);
	$(".nickwrapper").width($(window).width() - xoffset);

	$(".text-field").width( $(window).width() - $(".rightBar").width()  - xoffset);
	$(".m").width( $(window).width() - $(".rightBar").width()  -xoffset) ;
	$(".smiley-bar").width( $(window).width() - $(".rightBar").width() - xoffset);
	$(".chatWindow").width( $(window).width() - $(".rightBar").width()  - (xoffset + 10));
	$(".chatWindow").height( $(window).height() - ($(".head").height() + $(".bottomBar").height() + $(".xp-bar").height() + 10 + yoffset) );
	$(".right-bar").height($(window).height() - yoffset);
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
	winWidth = $(".window").width();
	winHeight = $(".window").height();
	headWidth = $(".head").width();
	bottomBarWidth = $(".bottomBar").width();
	xpBarWidth = $(".xp-bar").width();
	nickWrapperWidth = $(".nickwrapper").width();
	textfieldWidth = $(".text-field").width();
	mWidth = $(".m").width();
	smileyBarWidth = $(".smiley-bar").width();
	chatWindowWidth = $(".chatWindow").width();
	chatWindowHeight = $(".chatWindow").height();
	rightBarHeight = $(".right-bar").height();

	windowPosX = $(".window").offset().left;
	windowPosY = $(".window").offset().top;
}

function restoreWindow()
{
	$(".window").width(winWidth);
	$(".window").height(winHeight);
	$(".head").width(headWidth);
	$(".bottomBar").width(bottomBarWidth);
	$(".xp-bar").width(xpBarWidth);
	$(".nickwrapper").width(nickWrapperWidth);
	$(".text-field").width(textfieldWidth);
	$(".m").width(mWidth);
	$(".smiley-bar").width(smileyBarWidth);
	$(".chatWindow").width(chatWindowWidth);
	$(".chatWindow").height(chatWindowHeight);
	$(".right-bar").height(rightBarHeight);

	$(".window").offset({ top: windowPosY, left: windowPosX });
	autoScroll();
}