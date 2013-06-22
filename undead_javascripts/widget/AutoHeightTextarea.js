loadit("Widget.AutoHeightTextarea",function(){
Widget.AutoHeightTextarea = Widget.Base.extend({
	min_height: 20,
	events:{
		"keyup": "on_change",
		"click": "on_change"
	},
	initialize: function() {
		this.el.style.height = this.min_height + "px";
		this.el.style.overflowX = "hidden";
	},
	scroll_height: function() {
		return this.el.scrollHeight - (($.browser.mozilla) ? 0 : 18);
	},
	style_height: function() {
		return parseInt(this.el.style.height.replace(/px/gi,""));
	},
	set_style_height: function(h) {
		this.el.style.height = (h < this.min_height ? this.min_height : h) + "px";
	},
	on_change: function() {
		if (! this.delay_on_change){
			var self = this;
			this.delay_on_change = _.debounce(function() {
				self.on_change_();
			},100);
		}
		this.delay_on_change();
	},
	on_change_: function() {
		this.el.style.overflowY = "auto";
		var scrollh = this.scroll_height();
		var styleh = this.style_height();
		if ( scrollh > styleh ){
			this.set_style_height(scrollh);
		}else{
			var time = 50;
			while(time){
				if (scrollh <= this.min_height ) {
					this.set_style_height(this.min_height);
					break;
				}				
				if (scrollh > styleh){
					this.set_style_height(scrollh);
					break;
				}else{
					this.set_style_height(scrollh - 5);
				}
				scrollh = this.scroll_height();
				styleh = this.style_height();
				time -= 1;
			}
		}
		if (! $.browser.mozilla) this.el.style.overflowY = "hidden";
	}
})
});//end of loadit