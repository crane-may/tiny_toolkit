loadit("View.TweetShow",function(){
View.TweetShow = View.Tweet.extend({
	el: $(".post"),
	tagName: undefined,
  tweet_show: true,
	initialize:function(){},
	render:function(){
    var tar = $(_.template(Template.TweetCore)({self:this.model,core:this.model.toJSON()}));

		this.image_size = "X1";
    
    var self = this;
		tar.find("div.img_frame img.img_content").each(function() {
			var img = $(this);
			var next_url = self.next_image_url(img);
			img.toggleClass("big_pic").attr("src",next_url);
		});
    
		this.$(".msg_content_wrapper_wrapper").empty().append(tar);
		this.msg_wrapper = this.$el.find(".msg_content_wrapper");
		this.msg = this.$el.find(".msg_content");
    
    this.image_toggle("X1");
		this.video_toggle();
    var self = this;
    this.msg_wrapper.find(".video_thumb").each(function() {
      self.video_toggle_func.call(this);
    });
		
		this.remark_textare = this.model.setup_at(Widget.AutoHeightTextarea,this.$(".comment_area_tweet"));
		this.$(".del_link_bg").jConfirmAction({ on_yes: this.on_del , on_yes_context: this});
		this.remark_content = this.$(".comment_area_tweet").valid_view(Valid.Base);
		this.like_btn = this.model.setup_at(Widget.LikeButton, this.$(".like_link_bg"));
		
		this.$(".comment_edit_panel").smile_dropdown(this.$(".comment_area_tweet"),false,this.remark_textare);
		this.model.remarks().setup_with(View.RemarksList,{first_fetch: (this.model.get("cremark") != 0)});
		
		this.remark_btn = this.$(".reply_btn");
		this.model.setup_at(Widget.ChannelName,this.$(".chl_name_bg"));
	},
	on_del:function(){
    $.fetch({
  		url: "/messages/delete/"+this.model.id,
			type: "POST",
  		success : function(){
				App.refresh();
			}
  	});
	},
	on_remark: function() {
		this.$(".comment_area_tweet").focus();
	},
	on_create_remark: __.lock({
		handler: function() {
			this.remark_btn.loading_mask();
			ValidCenter({
				valid: this.remark_content,
				callback: function(){
					this.model.create_remark(this.remark_content.val(),function(){
						this.model.remarks().trigger("fetch_begin");
						this.remark_content.val("");
						this.remark_textare.on_change();
					},this);
				},
				context: this,
				lock: "remark"
			});
		},
		lock: "remark",
		unlock: function() {
			this.remark_btn.loading_mask_recover();
		}
	}),
  check_height: function() {}
});
});//end of loadit