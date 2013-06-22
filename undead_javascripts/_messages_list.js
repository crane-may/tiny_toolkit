SYNC_NOTICE.setup_with(View.Notice);$.scrollTo(0,0);

__messages_list.setup_with(View.MessagesListTimeline);

App.setup_at(Widget.LoadMore,$("#page_content"));
App.trigger("load_more");


App.setup_with(View.Toplink);

window.onload=function() {$.scrollTo(0,0);}