loadit("View.Edit",function(){
View.Edit = View.Base.extend({
	el: $("#edit_message"),
	events:{
		"click #edit_msg_submit":"on_save"
	},
	initialize: function() {},
	render: function() {
		this.select_box =  this.model.setup_into(Widget.SelectChannelBox, this.$("#choose_channel_select"),{current_channel_id: __cur_channel_id});
		
		App.on("editor_ready",function() {
			this.editor_ready();
		},this);
		
		this.editor = this.model.setup_with(View.Ueditor);
		this.save_btn = this.$("#edit_msg_submit");
		App.views["InputHome"] = this;
		
		App.setup_at(Widget.DayTile,this.$(".tweet_date"));
	},
	editor_ready: function() {
		this.$(".preload_textarea").remove();
		this.$(".tweet").removeClass("tweet_flag");
	},
	on_save: __.lock({
		handler: function() {
			this.save_btn.loading_mask();
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
						__.error("请选择一个所属主题");
						return false;
					};
					return true;		
				},
				callback:function(){
					var message = {};
					message['content'] = this.editor.val();
					message['channel_id'] = this.select_box.val();
					$.fetch({
						type: "POST",
						url: "/messages/update/" + __message_id,
						data: JSON.stringify(message),
						success: function(result) {
							__.success("保存成功！");
							App.goto("/m/"+result);
						},
						context: this,
						lock: "tweet_update"
					})
				},
				context:this,
				lock:"tweet_update"
			})
		},
		lock:"tweet_update",
		unlock: function() {
			this.save_btn.loading_mask_recover();
		}
	})
})
});//end of loadit