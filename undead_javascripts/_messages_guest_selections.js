$.scrollTo(0,0);

App.setup_with(View.Selections,{selections: __selections});
__messages_selections.setup_with(View.MessagesSelectionsTimeline,{tweet_view: View.TweetGuest});

App.set("current_selection",__selections[0].id);
App.set("current_selection_name",__selections[0].name);

App.setup_at(Widget.LoadMore,$("#page_content"));

App.setup_with(View.Toplink);

App.on("change:current_selection",function(m,lid){
	$.scrollTo(0,0);
},this);
