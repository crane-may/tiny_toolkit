SYNC_NOTICE.setup_with(View.Notice);

$(".unblock_btn").click(__.prevent(function() {
	Dialog.Unblack.open(null,{
		user_id: $(this).attr("data-uid")
	})
}));