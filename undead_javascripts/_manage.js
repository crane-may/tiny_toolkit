SYNC_NOTICE.setup_with(View.Notice);

$(".make_it_private").click(__.prevent(function() {
	var channel = __channels.get($(this).closest("li").attr("data-cid"));
	Dialog.PrivateChannel.open(channel);
}));

$(".make_it_public").click(__.prevent(function() {
	var channel = __channels.get($(this).closest("li").attr("data-cid"));
	Dialog.PublicChannel.open(channel);
}));

$(".invitation_btn").click(__.prevent(function() {
	var channel = __channels.get($(this).closest("li").attr("data-cid"));

	$.fetch({
		url:"/channels/generate_invitation/"+channel.id,
		type: "GET",
		success:function(result){
			Dialog.Invitation.open(channel,{invitation_code: result});
		}
	});
}));

$(".del_btn").click(__.prevent(function() {
	var channel = __channels.get($(this).closest("li").attr("data-cid"));
	Dialog.DelChannel.open(channel);
}));

$(".rename_btn").click(__.prevent(function() {
	var channel = __channels.get($(this).closest("li").attr("data-cid"));
	Dialog.RenameChannel.open(channel);
}));

$(".create_cnl_btn").click(__.prevent(function() {
	Dialog.CreateChannel.open(null);
}));

$(".resort_btn").click(__.prevent(function() {
	Dialog.ResortChannel.open(__channels);
}));