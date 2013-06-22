SYNC_NOTICE.setup_with(View.Notice);$.scrollTo(0,0);

Widget.OrgLikeButton = Widget.LikeButton;
Widget.LikeButton = Widget.OrgLikeButton.extend({
	on_click: function() {
		Widget.OrgLikeButton.prototype.on_click.apply(this,arguments);
		if (! this.is_liked){
			this.$el.closest(".tweet_wrap").remove();
			if ($(".post").length == 0) _.delay(function() {
				App.refresh();
			},1500);
		}
	}
});

__like.setup_with(View.CommonTimeline,{
	url: function(page) {
		return "/users/tweets_likes?offset="+(page*20)+"&limit=20";
	},
	count: __like_count
})


App.setup_with(View.Toplink);