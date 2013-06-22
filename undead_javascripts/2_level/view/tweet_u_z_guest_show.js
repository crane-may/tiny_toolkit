loadit("View.TweetGuestShow",function(){
View.TweetGuestShow = View.Tweet.extend({
	el: $(".post"),
	tagName: undefined,
	initialize:function(){},
	render:function(){
		this.$(".msg_content_wrapper_wrapper").html( 
			_.template(Template.TweetCore)({self:this.model,core:this.model.toJSON()})
		);
		
		this.msg_wrapper = this.$el.find(".msg_content_wrapper");
		this.msg = this.$el.find(".msg_content");
		this.image_toggle();
		this.video_toggle();
		
		this.model.setup_at(Widget.ChannelName,this.$(".chl_name_bg"),{no_follow:true});
		this.$(".byline").append(Widget.ShareLine(this.model.id,this.model.get("channel_name"),""));
	},
	on_del:function(){
	},
	on_remark: function() {
	}
});
});//end of loadit