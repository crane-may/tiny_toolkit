loadit("View.TweetTopic",function(){
View.TweetTopic = View.Tweet.extend({
	tagName: "div",
	className: "post clearfix",
	template: _.template(Template.TweetTopic),
	render:function(){
    if (window.__topic_id)
      this.show_url = "/topics/show/"+__topic_id+"/"+this.model.id+"?from_page="+(this.page || 0)+"&from_last_time="+encodeURIComponent(this.last_time);
    else
      this.show_url = "/topics/show/"+this.model.get("topic")+"/"+this.model.id;
    
		this.$el.html($(this.template({self:this.model,core:this.model.toJSON(),view:this})));
		this.msg_wrapper = this.$el.find(".msg_content_wrapper");
		this.msg = this.$el.find(".msg_content");
		this.collapse_open  = this.$el.find(".collapse_control:eq(0)");
		this.collapse_close = this.$el.find(".collapse_control:eq(1)");
		// tar.find("img").load();
		App.one("tweet_render_over",this.check_height,this);
		
		this.$(".del_link_bg").jConfirmAction({ on_yes: this.on_del , on_yes_context: this});
		this.like_btn = this.model.setup_at(Widget.LikeButton, this.$(".like_link_bg"));
		
		this.channel_name = this.model.setup_at(Widget.ChannelName, this.$(".chl_name_bg"));
	}
});
});//end of loadit