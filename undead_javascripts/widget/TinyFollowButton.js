loadit("Widget.TinyFollowButton",function() {
Widget.TinyFollowButton = Widget.Base.extend({
	events:{
	},
	chl_id:function() {
		return this.model.get("channel_id") || this.model.id;
	},
	fol_id:function() {
		return this.model.get("reader_follow_status") || this.model.get("followed_by");
	},
	set_fol_id:function(fol_id) {
		this.model.set((this.model instanceof Mod.Channel) ? "followed_by" : "reader_follow_status", fol_id);
	},
	initialize:function() {
		if (this.model.is_mine()) return;
		App.on("follow_map_change",function(cids) {
			if (cids[0] == this.chl_id()) {
				this.set_fol_id(cids[1]);
				this.render();
			}
		},this);
	},
	render: function() {
		if (this.model.is_mine()) {
			this.$el.remove();
			return;
		}
		if (!this.fol_id()) {
			if (this.full) {
				var tar = $("<a "+(this.full?"class='follow_btn'":"")+" href='javascript:void(0)'>订阅到</a>");
			}else{
				var tar = $("<a href='javascript:void(0)'>订阅到</a>");
			}
			
			this.$el.removeClass("followed_text");
			var self = this;
			tar.click(__.prevent(function() {
				Dialog.Follow.open(self.model);
			}));
			this.$el.html(tar);
		}else{
			var tar = this.$el.html(this.html_followed());
			
			var self = this;
			tar.find("a").click(__.prevent(function() {
				Dialog.CommonConfirm.open(null,{
					title: "取消订阅",
					note: '<h2 class="bck_img" style="font-size:14px;">您确定要取消订阅此主题吗？</h2><p class="line_style" style="padding-left:40px;">取消订阅后，此主题的相关日记也会消失，您可以先把喜欢的日记通过传阅或喜欢的方式保留</p>',
					callback: function() {
						$.fetch({
					  		url: "/channels/unfollow/" + self.chl_id(),
					  		data: "old_id=" + self.fol_id(),
							type: "POST",
							context: self,
					  		success : function(result){
								App.trigger("follow_map_change",[self.chl_id(),0]);
								$.modal.close();
								__.success("取消订阅成功！");
					  		},
					  		fail : "操作好像没有成功，再试一次吧！"
					    });				
					},
					callback_context: this
				})
			}));
		}
	},
	html_followed:function() {
		if (this.full) {
			this.$el.addClass("followed_text");
			return '已订阅到"'+__self_channels.get(this.fol_id()).get("name").channel_name()+'"<a href="javascirpt:void(0)" class="unfollow_btn" title="取消订阅">&nbsp;</a>';
		}else{
			return '已订阅&nbsp;&nbsp;<a href="javascirpt:void(0)" title="取消订阅">X</a>';
		}
	}
});

});