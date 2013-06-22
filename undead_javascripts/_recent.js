SYNC_NOTICE.setup_with(View.Notice);

__tweets.setup_with(View.TweetPinboard,{dim:__dim});

App.trigger("render_tweetpin");
App.setup_at(Widget.LoadMore,$("#page_content"),{max_more_times:29,max_click_times:29});


App.setup_with(View.Toplink);
