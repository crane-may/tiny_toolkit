SYNC_NOTICE.setup_with(View.Notice);$.scrollTo(0,0);

App.setup_with(View.Classify,{classify: __classify});
__messages_classify.setup_with(View.MessagesClassifyTimeline);

App.set("current_classify",__classify[0][0]);

App.setup_with(View.Toplink);