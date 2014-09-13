$('.smiley-symbol-1').click(function(){
	console.log("klick");
	var classList = $('#smiley-picker').attr('class').split(/\s+/);
	$.each( classList, function(index, item)
	{
    	if (item === 'hide') 
    	{
       		$("#smiley-picker").removeClass("hide");
    	}
    	else
    	{
    		$("#smiley-picker").addClass("hide");
    	}
    });
});

$("#smiley-picker").click(function(e){
   var parentOffset = $(this).offset();
   //or $(this).offset(); if you really just want the current element's offset
   var x = e.pageX - parentOffset.left;
   var y = e.pageY - (parentOffset.top+20);

   console.log(x + ", " + y);
   x = Math.floor(x/30);
   y = Math.floor(y/45);
   console.log(x + "," + y);
   var smiley = [[":)", ":D", ";)", ":O", ":P","(H)", ":@", ":S", ":$", ":("], 
                [":'(", ":|", "(A)", "8o|", "8-|","+o(", "<:o)", "|-)", "*-)", ":-#"], 
                [":-*", "^o)", "8-)", "(L)", "(U)","(M)", "(@)", "(&)", "(sn)", "(bah)"], 
                ["(S)", "(*)", "(#)", "(R)", "({)","(})", "(K)", "(F)", "(W)", "(O)"]];
   console.log(smiley[y][x]);
   $("#m").val($("#m").val() + smiley[y][x]);
});


$('#window').click(function(e){
    console.log("klick");
    var smileyPickerX = $("#smiley-picker").offset().left;
    var smileyPickerY = $("#smiley-picker").offset().top;
    var smileyPickerWidth = $("#smiley-picker").width();
    var smileyPickerHeight = $("#smiley-picker").height();
    var clickX = e.pageX;
    var clickY = e.pageY;

    if(clickX < smileyPickerX || clickX > (smileyPickerX + smileyPickerWidth) || clickY < smileyPickerY || clickY > (smileyPickerY + smileyPickerHeight))
    {
        var pickerLinkX = $(".smiley-symbol-1").offset().left;
        var pickerLinkY = $(".smiley-symbol-1").offset().top;
        var pickerLinkWidth = $(".smiley-symbol-1").width();
        var pickerLinkHeight = $(".smiley-symbol-1").height();
        if(clickX < pickerLinkX || clickX > (pickerLinkX + pickerLinkWidth) || clickY < pickerLinkY || clickY > (pickerLinkY + pickerLinkHeight))
        {
            $("#smiley-picker").addClass("hide");
        }
    }
    else
    {

    }
});