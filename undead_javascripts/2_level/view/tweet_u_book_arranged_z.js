loadit("View.BookArranged",function(){
View.BookArranged = View.Tweet.extend({
	tagName: "div",
	className: "post",
	template: _.template(Template.BookArranged),
	events: {
		"click .byline a:eq(2)": "on_del",
		"click .byline a:eq(0)": "on_up",
		"click .byline a:eq(1)": "on_down",
		"click .open_content_btn": "on_open_content",
		"click .close_content_btn": "on_close_content"
	},
	initialize:function(){
		this.$el.data("message_id",this.model.id);
	},
	render:function(){
		this.$el.html($(this.template({self:this.model,core:this.model.toJSON(),view:this})));
		this.msg_wrapper = this.$el.find(".msg_content_wrapper");
		this.msg = this.$el.find(".msg_content");
		this.collapse_open  = this.$el.find(".collapse_control:eq(0)");
		this.collapse_close = this.$el.find(".collapse_control:eq(1)");
		// tar.find("img").load();
		App.one("tweet_render_over",this.check_height,this);
		this.image_toggle();
		this.video_toggle();
	},
	on_del:function(){
		var self = this;
		this.collection().dirty = true;$.open_unsave_alert("目录修改未保存");
		this.collection().remove(this.model);
		this.$el.css("position","relative").animate({
			left:"-600px"
		},200,function() {
		  	self.$el.remove();
		  	delete __arranged[self.model.id+""];
		  	App.trigger("page_change");
		});
	},
	on_up:function() {
	  	var tar = this.$el.prev();
		this.collection().dirty = true;$.open_unsave_alert("目录修改未保存");
		
	  	if (tar.length > 0){
			var idx = this.collection().indexOf(this.model);
			this.collection().remove(this.model);
			this.collection().add(this.model,{at:idx - 1});
			
			var self = this;
			this.$el.fadeOut("fast",function() {
		    	tar.before(self.$el.detach());
				self.$el.fadeIn("fast");
				App.trigger("page_change");
			});
	  	}
	},
	on_down:function() {
	  	var tar = this.$el.next();
		this.collection().dirty = true;$.open_unsave_alert("目录修改未保存");
		
	  	if (tar.length > 0){
			var idx = this.collection().indexOf(this.model);
			this.collection().remove(this.model);
			this.collection().add(this.model,{at:idx + 1});
			
			var self = this;
			this.$el.fadeOut("fast",function() {
				tar.after(self.$el.detach());
				self.$el.fadeIn("fast");
				App.trigger("page_change");
			});
	  	}
	},
	collection:function() {
		if (! this._collection) {
			this._collection = this.model.import_to || this.model.collection;
		}
		return this._collection;
	}
})
});//end of loadit