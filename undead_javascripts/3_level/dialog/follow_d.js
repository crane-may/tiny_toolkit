loadit("Dialog.Follow",function(){
Dialog.Follow = Dialog.Base.extend({
	template: DialogTempl["follow"],
	height:215,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		this.select_channel = __self_channels.setup_at(Widget.NativeSelectChannel, this.$("select"), {default_tip: "---选择要订阅到的主题---"});
		
		if (this.followed_by){
			this.select_channel.val(this.followed_by);
			this.select_channel.clear_cancel();
		}
	},
	get_channel_id: function() {
		return this.model.get("channel_id") || this.model.id;
	},
	on_yes: function() {
		var new_id = this.select_channel.val();
		ValidCenter(
			function(){
				if(! new_id){
					__.fail("还没选择要订阅到的主题");
					return false
				}else{
					return true;
				}
			},function(){
				$.fetch({
		  		url: "/channels/follow/"+this.get_channel_id(),
		  		data: 'new_id='+new_id+(window.__code?"&code="+__code:""),
					type: "POST",
					context: this,
		  		success : function(result){
		  		  App.trigger("follow_map_change",[this.get_channel_id(),new_id]);
						
		  			$.modal.close();
		  			__.success("订阅成功！");
		  		}
		    });
			}
		,this);
	}
})
});//end of loadit