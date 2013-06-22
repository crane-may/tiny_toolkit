loadit("Widget.ShortCut",function(){
Widget.ShortCut = Widget.Base.extend({
	el:$("#channel_shortcut"),
	initialize: function() {
		App.on("create_tweet",function(chl_id){
			if (chl_id) this.add_item(this.model.get(chl_id));
		},this);
		App.on("change:current_tweet_channel_id",function(m,chl_id){
			this.$(".cnl_btn_active").removeClass("cnl_btn_active");
			if (this.items[chl_id]) this.items[chl_id].addClass("cnl_btn_active");
		},this);
		
		this.items = {};
	},
	max_len: 90,
	get_item: function(chl) {
		var item = $('<a href="javascript:void(0);" class="btn_normal channel_shortcut round_corner">'+chl.name_with_icon()+'</a>');
		var _chl = chl;
		item.click(__.prevent(function() {
			App.set("current_tweet_channel_id",_chl.id);
		}));
		this.items[chl.id] = item;
		return item;
	},
	add_item: function(chl) {
		if (!chl) return;
		if (this.items[chl.id]){
			this.items[chl.id].remove();
			var tar = this.get_item(chl).addClass("cnl_btn_active");
			this.$el.prepend(tar);
			if (tar.width() > this.max_len) tar.width(this.max_len).addClass("word_shortcut");
		}else{
			var tar = this.get_item(chl).addClass("cnl_btn_active")
			this.$el.prepend(tar);
			if (tar.width() > this.max_len) tar.width(this.max_len).addClass("word_shortcut");
		}
		this.$("a:gt(2)").remove();
	},
	render: function() {
		this.$el.append(
			__.empty_default(
				_(this.shortcut).reduce(function(memo,chl_id){
					return memo.add(this.get_item(this.model.get(chl_id)));
				},$(),this),
				'<p class="no_chl_notice">' + (this.$el.data("empty") || "您还没有主题，请先创建一个吧") + '</p>'
			)
		);
		var ml = this.max_len;
		this.$(".channel_shortcut").each(function() {
			if ($(this).width() > ml) 
				$(this).width(ml).addClass("word_shortcut");
		});
		return this;
	}
});
});//end of loadit