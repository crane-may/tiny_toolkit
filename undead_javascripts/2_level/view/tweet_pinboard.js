loadit("View.TweetPinboard",function(){
View.TweetPinboard = View.Base.extend({
	el: $(".pin_layout"),
	initialize:function(){
		this.el_col = this.$(".col_wrap");

		this.model.on("fetch_over",function() {
			App.trigger("render_tweetpin");
		});
		
		App.on("render_tweetpin",function() {
			if (this.model.length == 0) {
				App.trigger("no_load_more");
				$(".load_more_btn").remove();
			}else{
				if ($.browser.msie) {
					this.model.each(function(twt) {
						this.select_col_h(twt).append( twt.setup_with(View.TweetPin).$el );
					},this);
				
					var self = this;
					setTimeout(function() {
						self.reset_select_col_h();
					},200);
				}else{
					this.model.each(function(twt) {
						this.select_col().append( twt.setup_with(View.TweetPin).$el );
					},this);
				}
			}
			App.trigger("load_more_done");
		},this);
		
		App.on("load_more",function() {
			this.model.fetch({dim:this.dim});
		},this);
	},
	render:function(){
	},
	select_col:function() {
		var min_height = 99999999;
		var min_height_tar = null;
		
		for (var i=0; i < this.el_col.length; i++) {
			var h = $(this.el_col[i]).height();
			if (h < min_height) {
				min_height = h;
				min_height_tar = this.el_col[i];
			}
		}
		return $(min_height_tar);
	},
	select_col_with_text: function(tar) {
		if (!this.el_col_text){
			this.el_col_text = [];
			for (var i=0; i < this.el_col.length; i++) {
				this.el_col_text[i] = 0;
			}
		}
		
		var min_height = 99999999;
		var min_height_tar_idx = null;
		
		for (var i=0; i < this.el_col_text.length; i++) {
			var h = this.el_col_text[i];
			if (h < min_height) {
				min_height = h;
				min_height_tar_idx = i;
			}
		}
		this.el_col_text[min_height_tar_idx] = this.el_col_text[min_height_tar_idx] + Math.ceil(tar.get("content").length / 20 ) + 200;
		return $(this.el_col[min_height_tar_idx]);
	},
	select_col_h: function(tar) {
		if (!this.el_col_h){
			this.el_col_h = [];
			for (var i=0; i < this.el_col.length; i++) this.el_col_h[i] = 0;
		}
		
		var min_height = 99999999;
		var min_height_tar_idx = null;
		
		for (var i=0; i < this.el_col_h.length; i++) {
			var h = this.el_col_h[i];
			if (h < min_height) {
				min_height = h;
				min_height_tar_idx = i;
			}
		}
		this.el_col_h[min_height_tar_idx] = this.el_col_h[min_height_tar_idx] + Math.ceil(tar.get("content").length / 20 )*20 + 250;
		return $(this.el_col[min_height_tar_idx]);
	},
	reset_select_col_h:function() {
		for (var i=0; i < this.el_col.length; i++) {
			var h = $(this.el_col[i]).height();
			this.el_col_h[i] = h;
		}
	}
})
});//end of loadit