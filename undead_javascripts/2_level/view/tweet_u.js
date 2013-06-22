loadit("View.Tweet",function(){
View.Tweet = View.Base.extend({
	tagName: "div",
	className: "post clearfix",
	template: _.template(Template.Tweet),
	events: {
		"mouseenter" : "on_mouseenter",
		"mouseleave" : "on_mouseleave",
		"click .tweet_byline .retweet_link_bg" : "on_retweet",
		"click .tweet_byline .reply_link_bg" : "on_remark",
		"click .reply_btn" : "on_create_remark",
		"click .collapse_shadow": "on_open_content",
		"click .open_content_btn": "on_open_content",
		"click .close_content_btn": "on_close_content"
	},
	initialize:function(){
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
		
		this.remark_textare = this.model.setup_at(Widget.AutoHeightTextarea,this.$(".comment_area_tweet"));
		this.$(".del_link_bg").jConfirmAction({ on_yes: this.on_del , on_yes_context: this});
		this.remark_content = this.$(".comment_area_tweet").valid_view(Valid.Base);
		this.like_btn = this.model.setup_at(Widget.LikeButton, this.$(".like_link_bg"));
		
		this.remark_btn = this.$(".reply_btn");
		
		this.channel_name = this.model.setup_at(Widget.ChannelName, this.$(".chl_name_bg"));
		if (this.dateTile){
			this.model.setup_at(Widget.DayTile,this.$(".head_pic60").removeClass("head_pic50").addClass("tweet_date"));
		}
	},
	collapse_height: 500,
	check_height: function() {
		var self = this;
		var check_func = function() {
			if ((! self.need_collapse) && self.image_size == "L3" && (! self.video_opened) && (self.content_height() > self.collapse_height )){
					self.need_collapse = true;
					
					self.msg_wrapper.height(self.collapse_height);
					self.collapse_open.show();
			}			
		}
		
		check_func();
		if (self.msg_wrapper.find("img").length > 0){
			setTimeout(check_func,1000);
			setTimeout(check_func,4000);
		}
	},
	content_height: function() {
		return  _(this.msg_wrapper.children()).reduce(function(memo,i) {
			return memo + $(i).outerHeight(true);
		},0);
	},
	on_mouseenter:function(){
		this.$(".hover_show").show();
    if (this.$el.hasClass("post"))
      this.$el.addClass("post_hover");
	},
	on_mouseleave:function(){
		if (this.$(".question").length == 0)
			this.$(".hover_show").hide();
    this.$el.removeClass("post_hover");
	},
	on_del:function(){
		App.trigger("del_tweet");
    $.fetch({
  		url: this.model.is_mine() ? 
							("/messages/delete/"+this.model.id) :
							"/messages/delete_from_timeline/"+this.model.id+
									( this.model.collection.channel.is_user() ? "" : "?channel_id="+this.model.collection.channel.id ),
			type: "POST",
			context: this,
  		success : function(){
				var self = this.$el;
				self.fadeOut(500,function(){
					self.remove();
				})
			}
  	});
	},
	on_retweet:function(){
		 Dialog.Retweet.open(this.model);
	},
	on_remark: function() {
		if (_.isUndefined(this.remark_opened)){
			this.model.remarks().setup_at(View.Remarks,this.$(".comments"));
			this.$(".comment_edit_panel").smile_dropdown(this.$(".comment_area_tweet"),false,this.remark_textare);
		}
		
		if (this.remark_opened){
			this.$(".comments_wrapper").hide();
		}else{
			this.$(".comments_wrapper").show();
			if (this.model.get("cremark") != 0 || ! _.isUndefined(this.remark_opened)) this.model.remarks().trigger("fetch_begin");
			
			this.remark_textare.$el.cursor_end();
		}
		
		this.remark_opened = ! this.remark_opened;
	},
	on_create_remark: __.lock({
		handler: function() {
			this.remark_btn.loading_mask();
			ValidCenter({
				valid: this.remark_content,
				callback: function(){
					this.model.create_remark(this.remark_content.val(),function(){
						this.$(".comments_wrapper").show();
						this.model.remarks().trigger("fetch_begin");
						this.remark_opened = true;
						this.remark_content.val("");
						this.remark_textare.on_change();
					},this);
				},
				context: this,
				lock: "remark"
			});
		},
		lock: "remark",
		unlock: function() {
			this.remark_btn.loading_mask_recover();
		}
	}),
	on_open_content: function() {
		var self = this;
		// this.msg_wrapper.animate({
		// 	height: this.content_height()
		// },0,function() {
		// 	self.msg_wrapper.height("auto").css("height","auto");
		// 	
		// 	self.collapse_open.hide();
		// 	self.collapse_close.show();
		// })
		this.msg_wrapper.height("auto").css("height","auto");
			
		this.collapse_open.hide();
		this.collapse_close.show();		
	},
	on_close_content: function() {
		var self = this;
		var height = this.msg_wrapper.height();
		// this.msg_wrapper.animate({
		// 	height: this.collapse_height
		// },300,function() {
		// 	self.collapse_open.show();
		// 	self.collapse_close.hide();
		// })
		// if (height > 600){
		// 	$('html, body').animate({ scrollTop:this.msg.offset().top - 50 }, 5);
		// }
		var new_pos = __.scrollTop() - (height - self.collapse_height);
		this.msg_wrapper.height(this.collapse_height);
		self.collapse_open.show();
		self.collapse_close.hide();	
		// setTimeout(function() {
		// 	$.scrollTo(document.body.scrollTop - (height - self.collapse_height));
		// },100);
    __.scrollTop(new_pos);
		
    if (this.image_size == "X1") {
      this.image_toggle_func();
    }
	},
	next_image_url: function(img) {
		var lmap = {L3 : "-L3", X1 : "-X1"};
		return img.attr("src").replace(/-(L3|X1)/,lmap[this.image_size]);
	},
	image_toggle: function(init_size) {
		this.image_size = init_size || "L3";
		this.image_click = 0;
		var self = this;
    
    this.image_toggle_func = __.prevent(function(event) {
			self.image_click += 1;
			self.image_size = (self.image_size == "L3") ? "X1" : "L3";
			
      if (! self.tweet_show) {
        if (self.image_size == "X1" && self.need_collapse){
          self.on_open_content();
        }else{
  				if (event) {
  					setTimeout(function() {
  						var offset = $(__.event(event)).offset().top - event.clientY + 50 - __.scrollTop();
  						if (Math.abs(offset) > 300) {
  		        	__.scrollTop( $(__.event(event)).offset().top - event.clientY + 50);
  						}
  		      },10);
  				}
        }
      }
      
			self.msg_wrapper.find("div.img_frame img.img_content").each(function() {
				var img = $(this);
				var next_url = self.next_image_url(img);
				var click_t = self.image_click;
        
				img.parent().add_loading_img();
				__.preload_image(next_url,function () {
					if (click_t == self.image_click){
							  		img.parent().remove_loading_img();
				            img.toggleClass("big_pic");
							      img.attr("src",next_url);
					}
				});
			});
		});
    
		var fullscreen_func = __.ie6 ? (function(){}) : function() {
		  var url = $(this).attr("src").replace(/-(L3|X1)/,"-X2");
      var tar = $(this).next();
      tar.each(function() {
        $(this).click(__.prevent(function() {
          var src_list = [];
          self.msg_wrapper.find("div.img_frame img.img_content").each(function() {
            src_list.push($(this).attr("src").replace(/-(L3|X1)/,"-X2"));
          });
          
          App.setup_with(Widget.PicFullScreen,{src: url,src_list: src_list});
        }));
      });
      $(this).parent().hover(function() {
        // tar.show();
				tar.addClass("fullscreen_bg");
      },function() {
        // tar.hide();
				tar.removeClass("fullscreen_bg");
      });
		};
		
		this.msg_wrapper.find("div.img_frame img.img_content").click(this.image_toggle_func).each(fullscreen_func);
	},
	video_toggle: function() {
		var self = this;
    
    this.video_toggle_func = function() {
			$(this).hide().next().show().flash({
				swf: $(this).attr("data-swf"),
				width: 500,
				height: 408
			});
			$(this).next().next().show();
			self.video_opened = true;
		};
    
		this.msg_wrapper.find(".video_thumb").click(__.prevent(this.video_toggle_func));
		this.msg_wrapper.find(".video_operation a").click(__.prevent(function() {
			$(this).closest("div").hide().prev().empty().hide().prev().show();
		}));
	}
});
});//end of loadit