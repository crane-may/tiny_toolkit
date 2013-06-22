loadit("Widget.FollowButton",function(){
Widget.FollowButton = Widget.Base.extend({
	events:{
		"click":"on_click"
	},
	initialize: function() {
		App.on("follow_map_change",function(){
			this.render();
		},this);
		App.on("change:current_channel_id",function(m,cid) {
			if (cid == this.model.id){
				this.render();
			}
		},this);
	},
	max_length: 150,
	render: function() {
		if (this.model.has("followed_by")){
			var s = '已订阅到 '+ __self_channels.get(this.model.get("followed_by")).get("name").channel_name();
			
			this.$el.addClass("bg-green").html(s);
			var len = s.length;
			while(this.$el.width() > this.max_length && len > 0){
			  this.$el.html(s.substring(0,len) + " ...");
			  len -= 1 ;
			}
			
			this.unfollow_button.show();
		}	else {
			this.$el.removeClass("bg-green").html('订阅到').attr("title","将此主题订阅到");
			this.unfollow_button.hide();
		}
	},
	on_click: function() {
		Dialog.Follow.open(this.model,{
			followed_by: this.model.get("followed_by")
		});
	}
})
});//end of loadit