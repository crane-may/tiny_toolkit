SYNC_NOTICE.setup_with(View.Notice);$.scrollTo(0,0);

__user.setup_at(View.TagReadOnly, $(".user_details_right ul"));

function timeline_mode (is_timelime) {
	if (is_timelime) {
		$("#book_tab a:eq(0)").removeClass("on");
		$("#book_tab a:eq(1)").addClass("on");
		$("#book_tab").removeClass("on_book");
		
		$(".book_catalog_tag").addClass("hidden");
		$(".book_catalog_content").addClass("hidden");
	}else{
		$("#book_tab").show();
		$(".book_create").addClass("hidden");
		
		$("#book_tab a:eq(0)").addClass("on");
		$("#book_tab a:eq(1)").removeClass("on");
		$("#book_tab").addClass("on_book");
		
		$(".book_catalog_tag").removeClass("hidden");
		$(".book_catalog_content").removeClass("hidden");
	}
}

App.on("change:current_channel_id",function(m,cid) {
	var chl = __channels.get(cid);
	$("#book_tab").hide();
	$(".book_create").addClass("hidden");
	
	if (chl.is_user()) { return };
	
	if (__books_menus_len[cid] > 0){
		$("#book_tab").show();
	}else if (  (_(__book_channels_auth).indexOf(chl.id+"") >= 0 || __book_auth) &&
				parseInt(chl.get("timeline_sender_count")) >= 50 && 
				chl.is_mine()) {
		$(".book_create").removeClass("hidden");
		
		$(".book_create").unbind("click").click(__.prevent(function() {
			App.trigger("change_to_book");
			timeline_mode(false);
		}));
	}
	
	$("#book_tab a:eq(0)").unbind("click").click(__.prevent(function() {
		App.trigger("goto_channel",cid);
		timeline_mode(true);
	}));

	$("#book_tab a:eq(1)").unbind("click").click(__.prevent(function() {
		App.trigger("change_to_book");
		timeline_mode(false);
	}));
	
	timeline_mode(true);
});


if (__channels.length > 0){
	__channels.setup_with(__my_page ? View.Tongues : View.TonguesGuest);

	__channels.each(function(chl){
		chl.timeline("sender").setup_with(View.Timeline,{dateTile:true});
		chl.setup_with(View.ChannelInfoUserpage);
		chl.setup_with(View.BookView);
	});

	if ($.query.get("channel") && __channels.get($.query.get("channel"))){
		if ($.query.get("channel") && $.query.get("book")) {
			App.trigger("goto_channel",__channels.get($.query.get("channel")).id,1);
			App.trigger("change_to_book");
			timeline_mode(false);
		}else{
			App.trigger("goto_channel",__channels.get($.query.get("channel")).id);
		}
	}else{
		App.trigger("goto_channel",__channels.at(0).id);
	}
}else{
	$("#page_content_wrapper").html('<div class="no_visiable_chl">此用户没有可见主题</div>');
}

if (window.__calendar){
	__user.timeline("messages_in_day").setup_with(View.InDayTimeline,{dateTile:true});
}

App.on("app_complete",function() {
	if (! window.__calendar){
		$(".letter_button").click(__.prevent(function() {
			Dialog.Talk.open(null,{receiver_name: $(this).attr("data-receiver_name") });
		}));
		$(".blacklist_button").click(__.prevent(function() {
			Dialog.Black.open(null,{user_id: __user.raw_id()})
		}));
		$(".unblacklist_button").click(__.prevent(function() {
			Dialog.Unblack.open(null,{user_id: __user.raw_id()})
		}));
	}
	
	App.on("change:current_channel_id",function(m,cid) {
		App.delay_trigger(10,"reset_tip");
	});	
})

App.setup_with(View.Toplink);

var leftbox = $("#leftbox");
var sidebar_userpage = $("#sidebar_userpage");
__.set_content_min_height($("#content"),$("#content_blank"),function() {
	return Math.max( leftbox.outerHeight(true), sidebar_userpage.outerHeight(true), 700 );
});
