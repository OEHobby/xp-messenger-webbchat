function createWindow(nr)
{
	var win = '<div class="window-' + nr + ' window ui-widget-content hide">';
	win += '	<div class="xp-bar-' + nr + ' xp-bar blue-bar">';
	win += '		<p class="program-title">MSN Messenger - (offline) - make sure youre requesting <a href="//msn.oskaremilsson.se:3000">url:3000</a></p>';
	win += '		<div class="minimize-button-' + nr + ' minimize-button blue-xp-button"><p class="xp-button-text">_</p></div>';
	win += '		<div class="maximize-buttom-' + nr + ' maximize-button blue-xp-button"><p class="xp-button-text">[]</p></div>';
	win += '		<div class="close-button red-xp-button"><p class="xp-button-text">X</p></div>';
	win += '	</div>';
	win += '	<div class="head-' + nr + ' head">';
	win += '		<div class="nickWrapper-' + nr + ' nickWrapper">';
	win += '			<div class="msn-head"></div>';
	win += '			<p class="nickName">Kittyface</p>';
	win += '			<p class="nickStatus">Filurar på något mystiskt.</p>';
	win += '		</div>';
	win += '		<div class="head-symbol head-symbol-1"></div>';
	win += '		<div class="head-symbol head-symbol-2"></div>';
	win += '		<div class="head-symbol head-symbol-3"></div>';
	win += '		<div class="head-symbol head-symbol-4"></div>';
	win += '		<div class="head-symbol head-symbol-5"></div>';
	win += '		<div class="head-symbol head-symbol-6"></div>';
	win += '		<div class="head-symbol head-symbol-7"></div>';
	win += '	</div>';
	win += '	<div class="chatWindow-' + nr + ' chatWindow"></div>';
	win += '	<div class="smiley-picker hide"></div>';
	win += '	<div class="rightBar-' + nr + ' rightBar">';
	win += '		<div class="profilePicture1 profile-picture"><img src="//root.oskaremilsson.se/chat/img/profile_pic.png"></div>';

	win += '	</div>';
	win += '	<div class="bottomBar-' + nr + ' bottomBar">';
	win += '		<div class="profilePicture2 profile-picture"><img src="//root.oskaremilsson.se/chat/img/profile_pic.png"></div>';
	win += '		<div class="smiley-bar-' + nr + ' smiley-bar">';
	win += '			<div class="smiley-symbol smiley-symbol-1"></div>';
	win += '			<div class="smiley-symbol smiley-symbol-2"></div>';
	win += '			<div class="smiley-symbol smiley-symbol-3"></div>';
	win += '			<div class="smiley-symbol smiley-symbol-4"></div>';
	win += '			<div class="smiley-symbol smiley-symbol-5"></div>';
	win += '			<div class="smiley-symbol smiley-symbol-6"></div>';
	win += '		</div>';
	win += '		<div class="text-field-' + nr + ' text-field">';
	win += '			<form action="" id="message-form-' + nr + '" class="message-form">';
	win += '				<textarea type="text" class="m-' + nr + ' m" autocomplete="off"></textarea>';
	win += '				<input type="submit" class="button-' + nr + ' button" value="Send" /></form></div>';
	win += '	</div>';
	win += '</div>';

	$('#wrapper').html(	$('#wrapper').html() + win);
	console.log("wringing to wrapper");
}

var windows = [];
windows.push("window-0");

 $('.m-0').keydown(function(event) {
    if (event.keyCode == 13) {
        $(this.form).submit()
        return false;
     }
 });

createWindow(0);