loadit("Widget.LoadMore",function(){
Widget.LoadMore = Widget.Base.extend({
	events:{
		"click .load_more_btn": "on_more"
	},
	max_more_times: 9,
	max_click_times: 29,
	more_times:0,
	initialize: function() {
		this.button = this.$(".load_more_btn");
		this.loading = this.$(".load_more_loading");
		
		App.on("load_more_done",function(){
			if (this.more_times < this.max_click_times) this.button.removeClass("hidden");
			if (this.more_times >= this.max_more_times) this.button.html("点击加载更多");
			this.loading.hide();
		},this);
		
		App.on("no_load_more",function(){
			this.more_times = this.max_click_times + 100;
		},this);
		
		App.on("refresh_load_more",function(){
			this.more_times = 0;
		},this);
		
		var self = this;
		var win_ = $(window);
		win_.scroll(_.debounce(function() {
			if ( (!self.button.hasClass("hidden")) && 
					 self.more_times < self.max_more_times &&
					 win_.scrollTop()+win_.height()-self.button.offset().top > -10 ){
				self.on_more();
			}
		},100))
	},
	render: function() {},
	on_more: function() {
		App.trigger("load_more",this.more_times);
		this.button.addClass("hidden");
		this.loading.show();
		this.more_times += 1;
	}
})
});//end of loadit