SYNC_NOTICE.setup_with(View.Notice);$.scrollTo(0,0);

__book_arrange_left.setup_with(View.BookWillArrangedContainer);
__menus.setup_with(View.BookArrangedContainer);

__arranged = {};
__menus.each(function(menu) {
	_(menu.get("msgs")).each(function(mid) {
		__arranged[mid+""] = true;
	})
});

$(".save_btn").click(__.prevent(function() {
	var changed_menus = {};
	__menus.each(function(menu) {
		if (menu.timeline.dirty) {
			changed_menus[menu.id] = menu.timeline.map(function(i) {return i.id});
		}
	});
	
	var tar = $(this);
	var lock_handler = __.lock({
		handler:function() {
			tar.loading_mask();
			
			$.fetch({
				url:"/books/arrange_book/"+__channel_id,
				data: JSON.stringify(changed_menus),
				type: "POST",
				success:function() {
					__.success("保存成功");
					$.close_unsave_alert(); 
					App.goto("/u/"+CURRENT_USER_ID+"?channel="+__channel_id+"&book=true");
				}
			});
		},
		lock: "arrange_book",
		unlock: function() {
			tar.loading_mask_recover();
		}
	});
	
	lock_handler();
}));
App.setup_with(View.Toplink);