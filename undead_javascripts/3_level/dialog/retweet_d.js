loadit("Dialog.Retweet",function(){
Dialog.Retweet = Dialog.Base.extend({
	template: DialogTempl['retweet'],
	width:525,
	height:255,
	events:{
		"click .yes":"on_yes"
	},
	onShow:function(){
		this.select_channel = __self_channels.setup_at(Widget.NativeSelectChannel, this.$("#comment_retweet"), {default_tip: "---选择要传阅到的主题---"});
		
		this.content = this.$("#retweet_msg").valid_view(Valid.Base);
		this.$("#retweet_msg_smile").empty().smile_dropdown(this.$("#retweet_msg"),true);
	},
	on_yes:function(){
		ValidCenter([
			this.content,
			function(){
				if (this.select_channel.val()){
					return true;
				}else{
					__.fail("请选择一个主题！");
					return false;
				}
			}
		],function(){
			$.fetch({
				type: "POST",
				url: "/messages/retweet/"+this.model.id+"?channel_id="+this.select_channel.val(),
				data: JSON.stringify( {'content' : _$.plain_html(this.content.val())} ),
				success : function(result){
					$.modal.close();
					__.success("传阅成功！");
					
					App.trigger("refresh_notice");
					
					// App.trigger("create_tweet");
				},
				fail : "操作好像没有成功，再试一次吧！"
			});
		},this);
	}
})
});//end of loadit