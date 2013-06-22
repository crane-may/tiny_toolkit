loadit("View.Tip",function(){
View.Tip = View.Base.extend({
	template: _.template(Template.Tip),
	events: {
		"click a": "on_destroy"
	},
	initialize:function(){
		if ( this.is_need() ){
			App.on("reset_tip",function() {
				this.pos();
			},this);			
		}
	},
	is_need: function() {
		return this.model.has(this.$el.data("tip")) && this.model.get(this.$el.data("tip")) != "0";
	},
	render:function(){
		if ( this.is_need() ){
			this.$el.html(this.template({text:this.$el.data("text")}));
			this.parent = this.$el.parent();
			this.top = parseInt(this.$el.data("top"));
			this.left = parseInt(this.$el.data("left"));
		
			if ($.browser.msie && $.browser.version == "6.0"){
				this.$el.find(".tiptip_arrow_pic").show().next().hide();
			}
		
			this.last_parent_top = -1;
			this.last_parent_left = -1;
		
			var self = this;
			this.interval_handler = setInterval(function() {
				self.pos();
			},500);
			self.pos();
		}else{
			this.$el.remove();
		}
	},
	pos: function() {
		if (this.parent.is(":visible")){
			var parent_offset = this.parent.offset();
			
			if (! (this.last_parent_top == parent_offset.top && this.last_parent_left == parent_offset.left) ){
				this.$el.css({
												"top" : (parent_offset.top + this.top) + "px" ,
							  				"left": (parent_offset.left + this.left) + "px"
											});
							
				this.last_parent_top = parent_offset.top;
				this.last_parent_left = parent_offset.left;
			}
			this.$el.removeClass("hidden");
		}else{
			this.$el.addClass("hidden");
		}
	},
	on_destroy: function() {
		$.fetch({
			url:"/users/notice_cancel?event="+this.$el.data("tip"),
			noti:"no",
			type:"POST",
			success: function(){}
		});
		if (this.interval_handler) clearInterval(this.interval_handler);
		this.$el.remove();
	}
})
});//end of loadit