SYNC_NOTICE.setup_with(View.Notice);$.scrollTo(0,0);

__at.setup_with(View.CommonTimeline,{
	url: function(page) {
		return "/users/tweets_at_me?offset="+(page*20)+"&limit=20";
	},
	count: __at_count
})


App.setup_with(View.Toplink);