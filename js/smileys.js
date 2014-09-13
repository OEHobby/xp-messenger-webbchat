function createSmileys(msg)
{
	for(var i = 0; i < msg.split(" ").length; i++)
	{
	msg = msg.replace("(&#38;)", "<span class='smiley smiley-28'></span>"); // has to be before ;)

	msg = msg.replace(":)", "<span class='smiley smiley-1'></span>");
	msg = msg.replace(":D", "<span class='smiley smiley-2'></span>");
	msg = msg.replace(";)", "<span class='smiley smiley-3'></span>");
	msg = msg.replace(":O", "<span class='smiley smiley-4'></span>");
	msg = msg.replace(":P", "<span class='smiley smiley-5'></span>");
	msg = msg.replace(":p", "<span class='smiley smiley-5'></span>");
	msg = msg.replace("(H)", "<span class='smiley smiley-6'></span>");
	msg = msg.replace(":@", "<span class='smiley smiley-7'></span>");
	msg = msg.replace(":S", "<span class='smiley smiley-8'></span>");
	msg = msg.replace(":$", "<span class='smiley smiley-9'></span>");
	msg = msg.replace(":(", "<span class='smiley smiley-10'></span>");

	msg = msg.replace(":'(", "<span class='smiley smiley-11'></span>");
	msg = msg.replace(":|", "<span class='smiley smiley-12'></span>");
	msg = msg.replace("(A)", "<span class='smiley smiley-13'></span>");
	msg = msg.replace("8o|", "<span class='smiley smiley-14'></span>");
	msg = msg.replace("8-|", "<span class='smiley smiley-15'></span>");
	msg = msg.replace("+o(", "<span class='smiley smiley-16'></span>");
	msg = msg.replace("&#60;:o)", "<span class='smiley smiley-17'></span>");
	msg = msg.replace("|-)", "<span class='smiley smiley-18'></span>");
	msg = msg.replace("*-)", "<span class='smiley smiley-19'></span>");
	msg = msg.replace(":-#", "<span class='smiley smiley-20'></span>");

	msg = msg.replace(":-*", "<span class='smiley smiley-21'></span>");
	msg = msg.replace("^o)", "<span class='smiley smiley-22'></span>");
	msg = msg.replace("8-)", "<span class='smiley smiley-23'></span>");
	msg = msg.replace("(L)", "<span class='smiley smiley-24'></span>");
	msg = msg.replace("(U)", "<span class='smiley smiley-25'></span>");
	msg = msg.replace("(M)", "<span class='smiley smiley-26'></span>");
	msg = msg.replace("(@)", "<span class='smiley smiley-27'></span>");
	
	msg = msg.replace("(sn)", "<span class='smiley smiley-29'></span>");
	msg = msg.replace("(bah)", "<span class='smiley smiley-30'></span>");

	msg = msg.replace("(S)", "<span class='smiley smiley-31'></span>");
	msg = msg.replace("(*)", "<span class='smiley smiley-32'></span>");
	msg = msg.replace("(#)", "<span class='smiley smiley-33'></span>");
	msg = msg.replace("(R)", "<span class='smiley smiley-34'></span>");
	msg = msg.replace("({)", "<span class='smiley smiley-35'></span>");
	msg = msg.replace("(})", "<span class='smiley smiley-36'></span>");
	msg = msg.replace("(K)", "<span class='smiley smiley-37'></span>");
	msg = msg.replace("(F)", "<span class='smiley smiley-38'></span>");
	msg = msg.replace("(W)", "<span class='smiley smiley-39'></span>");
	msg = msg.replace("(O)", "<span class='smiley smiley-40'></span>");

	}

	return msg;
}
