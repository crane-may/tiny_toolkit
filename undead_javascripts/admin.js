$(document).ready(function() {
	if (CONTROLLER_ACTION_NAME == "users/show") {
		$("#user_panel_username").after($('<a target="_blank" style="font-size:12px" href="'+TOOLS_ROOT+"/u/"+__user.id.replace(/user_/g,"")+'">&nbsp;◥</a>'));
	}
	
	else if (CONTROLLER_ACTION_NAME == "messages/show") {
		$(".entry a:eq(1)").after($('<a target="_blank" style="font-size:12px" href="'+TOOLS_ROOT+"/m/"+__tweet.id+'">&nbsp;◥</a>'));
	}
});

