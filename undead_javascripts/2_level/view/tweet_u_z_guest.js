loadit("View.TweetGuest",function(){
View.TweetGuest = View.TweetHot.extend({
	events: {
		"mouseenter" : "on_mouseenter",
		"mouseleave" : "on_mouseleave",
		"click .tweet_byline .retweet_link_bg" : "on_retweet",
		"click .tweet_byline .reply_link_bg" : "on_remark",
		"click .tweet_byline .like_link_bg" : "on_like",
		"click .collapse_shadow": "on_open_content",
		"click .open_content_btn": "on_open_content",
		"click .close_content_btn": "on_close_content"
	},
	render:function(){
		this.$el.html($(this.template({self:this.model,core:this.model.toJSON(),view:this})));
		this.msg_wrapper = this.$el.find(".msg_content_wrapper");
		this.msg = this.$el.find(".msg_content");
		this.collapse_open  = this.$el.find(".collapse_control:eq(0)");
		this.collapse_close = this.$el.find(".collapse_control:eq(1)");
		// tar.find("img").load();
		App.one("tweet_render_over",this.check_height,this);
		this.image_toggle();
		this.video_toggle();
				
		this.channel_name = this.model.setup_at(Widget.ChannelName, this.$(".chl_name_bg"),{no_follow:true});
	},
	on_retweet:function(){
		Dialog.Login.open(null);
	},
	on_remark: function() {
		Dialog.Login.open(null);
	},
	on_like: function() {
		Dialog.Login.open(null);
	}
	
});
});//end of loadit