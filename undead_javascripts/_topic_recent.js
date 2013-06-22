SYNC_NOTICE.setup_with(View.Notice);$.scrollTo(0,0);

__topics.setup_with(View.TopicMessagesListTimeline,{tweet_template: View.TweetTopic, count: __count});

$(".nav_tabs a:eq(0)").click(__.prevent(function() {
	$(".nav_tabs a:eq(0)").addClass("on");
	$(".nav_tabs a:eq(1)").removeClass("on");

	$(".topics_list").fadeOut(300,function() {
		$(".topics_list").hide();
		$("#posts").fadeIn(300);
		$("#pageinate").show();
	});
	
}));

$(".nav_tabs a:eq(1)").click(__.prevent(function() {
	$(".nav_tabs a:eq(0)").removeClass("on");
	$(".nav_tabs a:eq(1)").addClass("on");
	
	$("#posts").fadeOut(300,function() {
		$("#posts").hide();
		$("#pageinate").hide();
		$(".topics_list").fadeIn(300);
	});
}));