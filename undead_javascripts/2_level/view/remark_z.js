loadit("View.Remarks",function(){

window.View.Remark = View.Base.extend({
	tagName: "dl",
	className: "comment clearfix",
	template: _.template(Template.remark),
	events: {
		"click .reply_remark":"on_reply",
		"mouseenter" : "on_mouseenter",
		"mouseleave" : "on_mouseleave"
	},
	initialize: function() {},
	render: function() {
		this.$el.html(this.template({self:this.model,core:this.model.toJSON()}));
    if (App.without_remark_del)
      this.$(".del_remark").remove();
    else
		  this.$(".del_remark").jConfirmAction({ on_yes: this.on_del , on_yes_context: this});
	},
	on_del: function() {
		$.fetch({
	    url:"/messages/delete_remark/"+this.model.get("msg_id")+"?remark_id="+this.model.id,
			type:"POST",
	    success:function () {
				this.$el.remove();
	    },
			context: this
	  });
	},
	on_reply: function() {
		var inpt = this.$el.closest(".post").find("textarea");
		inpt.val("回复 @"+this.model.get("user_name")+" : "+inpt.val()).cursor_end().click();
	},
	on_mouseenter:function(){
    this.$(".comment_hover_ele").show();
    this.$el.addClass("comment_hover");
	},
	on_mouseleave:function(){
		if (this.$(".question").length == 0)
			this.$(".comment_hover_ele").hide();  
    this.$el.removeClass("comment_hover");
	}
})

window.View.Remarks = View.Base.extend({
	initialize: function() {
		this.model.on("fetch_begin",function(){
			this.$el.html("<p class='remark_load'><img src='"+$_.static_url("/images/loading.gif")+"'></img></p>");
			this.model.fetch();
		},this);
		
		this.model.on("fetch_over",function(){
			this.$el.html(
				this.model.reduce(function(memo,rmk){
					return memo.add(rmk.setup_with(View.Remark).$el);
				},$())
			)
		},this);
	}
})

window.View.RemarksList = View.Base.extend({
	el: $("#comments"),
	first_fetch: true,
	initialize: function() {
		this.on("page_change",function(page){
			this.$el.html("<p class='remark_load'><img src='"+$_.static_url("/images/loading.gif")+"'></img></p>");
			this.model.fetch({offset: page * this.model.line_length});
		});
		this.model.on("fetch_begin",function(){
			this.model.fetch();
		},this);
		
		this.model.on("fetch_over",function(){
			this.$el.html(
				this.model.reduce(function(memo,rmk){
					return memo.add(rmk.setup_with(View.Remark).$el);
				},$())
			)
		},this);
		
	},
	render: function() {
		$("#pageinate").empty().pagination(this.model.count(), {
	  	callback: function(page_index,jq){
  	    this.trigger("page_change",page_index);
	  	},
			link_to:"javascript:void(0)",
	  	items_per_page: this.model.line_length,
			call_after_init: this.first_fetch,
			context: this
		});
	}
})

});//end of loadit