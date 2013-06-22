loadit("View.InputHome",function(){
View.InputHome = View.Base.extend({
	el: $(".inlet"),
	events:{
		"click #post_msg":"on_create_tweet",
		"click .create_cnl_btn":"on_create_channel"
	},
	initialize: function() {},
	render: function() {
		if (__.is_mobile_phone()) {
			$("#more_channel").addClass("mobile_more_channel").html('<select class="select_cnl"></select>');
			
			this.select_box = this.model.setup_at(Widget.NativeSelectChannel, $("#more_channel select"), {default_tip: "---所有日记主题---",
			on_change_callback: function(val) {
				if (val) App.set("current_tweet_channel_id",val);
			}});
			
			App.on("change:current_tweet_channel_id",function(m,chl_id) {
				if (chl_id != this.select_box.val()){
					this.select_box.val(chl_id);
				}
				this.select_box.clear_cancel();
			},this);
		}else{
			this.select_box =  this.model.setup_into(Widget.SelectChannelBox, $("#more_channel"),{title: this.select_title});
		}
		
		this.model.setup_with(Widget.SelectChannelLabel);
		this.shortcut_channels = this.model.setup_with(Widget.ShortCut,{shortcut : this.shortcut});
		
		App.on("editor_ready",function() {
			this.editor_ready();
			if (! window.TS_EDITOR_LOADED) window.TS_EDITOR_LOADED = $.now();
		},this);
		
		if ($.browser.mozilla){
  		this.$(".preload_textarea").remove();
  		this.$(".tweet").removeClass("tweet_flag");		  
		}
		
		if (__.is_mobile_phone())
			this.editor = this.model.setup_with(View.TextAreaEditor);
		else
			this.editor = this.model.setup_with(View.Ueditor);
		this.tweet_btn = this.$("#post_msg");
		App.setup_at(Widget.DayTile,this.$(".tweet_date"));
		App.views["InputHome"] = this;
	},
	editor_ready: function() {
		this.$(".preload_textarea").remove();
		this.$(".tweet").removeClass("tweet_flag");
	},
	on_create_channel: function() {
		Dialog.CreateChannel.open();
	},
	on_create_tweet: __.lock({
		handler: function() {
			this.tweet_btn.loading_mask({
				cls: "post_msg_loading",
				html: ''
			})
			ValidCenter({
				valid: function(){
					if (! this.editor.editor){
						__.error("编辑器正在加载中，请稍候！");
						return false;
					};
					if (this.editor.is_empty()){
						__.error("日记内容不能为空！");
						return false;
					};
					if (this.editor.count() > 61415){
						__.error("你可以去写小说了，日记内容不能超过31415个字");
						return false;
					};
					if (! this.select_box.val()){
						__.error("请选择一个主题再发布日记吧！");
						return false;
					};
					return true;		
				},
				callback: function(){
					var message = {};
					var cid = this.select_box.val();
					message['content'] = this.editor.val();
					
					$.fetch({
						type: "POST",
						url: (this.tweet_url || "/channels/tweet/") + cid,
						data: JSON.stringify(message),
						success: function(result) {
							__.success("发布成功！");
							this.editor.val("");
							if (this.return_tweet_at_created){
								App.trigger("create_tweet",new Mod.Tweet({
									channel_id: cid,
									content: message['content'],
									user_id: CURRENT_USER_ID,
									
									clike: 0,
									cremark: 0,
									cretweet: 0,
									del: 0,
									parent_id: 0,
									reader_like_status: 0,

									id: result.id,
									user_name: result.user_name,
									user_face: result.user_face,
									channel_name: result.channel_name,
									msg_at: result.msg_at,
									level: result.level
								}));
							}else{
								App.trigger("create_tweet",cid);
							}
						},
						fail : "操作好像没有成功，再试一次吧！",
						context: this,
						lock: "tweeting"
					})
				},
				context: this,
				lock: "tweeting"
			})
		},
		lock:"tweeting",
		unlock: function() {
			this.tweet_btn.loading_mask_recover();
		}
	})	
})
});//end of loadit