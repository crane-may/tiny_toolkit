SYNC_NOTICE.setup_with(View.Notice);$.scrollTo(0,0);

App.on("app_ready",function() {
	App.setup_with(View.Toplink);
	
	$(".promote_btn").click(__.prevent(function() {
		Dialog.UserPromote.open();
	}));
});