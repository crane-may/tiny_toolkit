loadit("View.Letter",function(){
View.Letter = View.Base.extend({
	tagName: "li",
	className: "mt20 clearfix",
	template: _.template(Template.Letter),
	events: {
		"click .letter_reply_btn": "on_reply"
	},
	initialize:function(){},
	render:function(){
		this.$el.addClass( this.model.is_mine() ? "letter_r" : "letter_l" ).html(this.template({self:this.model,core:this.model.toJSON()}));
		
		this.$(".confirm").jConfirmAction({
			on_yes: function() {
				$.fetch({
			    url:"/letters/delete/"+this.model.id,
					type: "POST",
			    success:function(){
			      __.success("删除成功");
			      this.$el.remove();
			    },
					context: this
			  });
			},
			on_yes_context: this
		});
	},
	on_reply:function(){
		$("#write_letter").focus();
	}
});

View.Letters = View.Base.extend({
	el: $("#letters_wrapper"),
  initialize:function() {
    this.letter_box = $("#write_letter").valid_view(Valid.Base);
  },
	draw_title: function(other_id) {
		if (window.__username_db[other_id]) {
	    document.title = window.__username_db[other_id] + " 和我的悄悄话 - iBooloo";
	    $("#page_title").html("<a href='/u/"+other_id+"'>"+window.__username_db[other_id] + "</a> 和我的悄悄话");			
		}
	},
	init: function(other_id) {
		this.draw_title(other_id);
    
		this.off("page_change").on("page_change",function(page) {
			this.$el.html("<div class='loading' ><img src='"+$_.static_url('/images/loading.gif')+"'></div>");
			this.model.fetch({"page": page,"other_id": other_id});
		})
		
    var not_paged = true;
    $("#pageinate").empty().pagination(10, {
	  	callback: function(page_index,jq){
  	    this.trigger("page_change",page_index);
	  	},
			link_to:"javascript:void(0)",
	  	items_per_page: 20,
			context: this
		});
		
		this.model.off("fetch_over").on("fetch_over",function(count,name){
			window.__username_db[other_id] = name;
			this.draw_title(other_id);
      if (not_paged) {
        $("#pageinate").pagination(count);
        not_paged = false;
      }
			this.$el.html(
				this.model.reduce(function(memo,tweet){
					return memo.add(tweet.setup_with(View.Letter).$el);
				},$())
			)
		},this);
    
    var self = this;
    var send_btn = $(".send_btn");
    send_btn.unbind("click").click(__.prevent(
    	__.lock({
    		handler: function() {
    			send_btn.loading_mask();
    			ValidCenter({
    				valid: self.letter_box,
    				callback: function() {
    					$.fetch({
    						type:"POST",
    						url:"/letters/talk/"+other_id,
    						data:JSON.stringify({"content":_.escape(self.letter_box.val())}),
    						success:function(){
    							__.success("发送成功");
    							self.letter_box.val("");

    							$("#pageinate").trigger('setPage', [0]);
    						},
    						lock: "letter"
    					});
    				},
    				lock: "letter"
    			})
    		},
    		lock: "letter",
    		unlock: function() {
    			send_btn.loading_mask_recover();
    		}
    	})
    ));
	}
});

View.HomeLetter = View.Base.extend({
	tagName: "dl",
	className: "clearfix",
	template: _.template(Template.HomeLetter),
	events: {
		"mouseenter" : "on_mouseenter",
		"mouseleave" : "on_mouseleave"
	},
	initialize:function(){},
	render:function(){
		var self = this;
    this.$el.html(this.template({self:this.model,core:this.model.toJSON()}));
    window.__username_db[this.model.get("other_id")] = this.model.get("other_name");
    
    this.$el.click(function(event) {
      if (!( $(__.event(event)).is("a") || $(__.event(event)).closest(".question").length ))
        App.trigger("letter_entry",self.model.get("other_id"));
    });
    
    this.$(".del_btn").jConfirmAction({
    	on_yes: function() {
    		$.fetch({
    			type: "POST",
    	    url:"/letters/delete_user/"+ self.model.get("other_id"),
    	    success:function (){
    	      __.success("删除成功");
    	      this.closest("dl").remove();
    	    },
    			context:this
    	  });
    	}
    })
	},
  on_mouseenter:function() {
    this.$el.addClass("letter_hover");
  },
  on_mouseleave:function() {
    this.$el.removeClass("letter_hover");
  }
});

View.HomeLetters = View.Base.extend({
	el: $(".all_letters"),
  initialize: function() {},
  init: function() {
    document.title = "我的悄悄话 - iBooloo";
    $("#page_title").html("我的悄悄话");
    
		this.off("page_change").on("page_change",function(page) {
			this.$el.html("<div class='loading' ><img src='"+$_.static_url('/images/loading.gif')+"'></div>");
			this.model.fetch({"page": page});
		});
		
    $("#pageinate").empty().pagination(__count, {
	  	callback: function(page_index,jq){
  	    this.trigger("page_change",page_index);
	  	},
			link_to:"javascript:void(0)",
	  	items_per_page: 20,
			context: this
		});
		
		this.model.off("fetch_over").on("fetch_over",function(count){
			this.$el.html(
				__.empty_default( this.model.reduce(function(memo,tweet){
					return memo.add(tweet.setup_with(View.HomeLetter).$el);
				},$()),'<p class="empty_relative_messages">还没有人发过悄悄话给您</p>'
      ))
		},this);
	}
});
});//end of loadit