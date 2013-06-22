loadit("View.BookWillArranged",function(){
View.BookWillArranged = View.Base.extend({
	tagName: "div",
	className: "post_sub clearfix",
	template: _.template(Template.BookWillArranged),
	events: {
		"click a": "on_import"
	},
	initialize:function(){
		App.on("page_change",function() {
			$(".arrange_left .post_sub").each(function() {
				if ( __arranged[ $(this).data("message_id") ] ){
					$(this).addClass("arranged");
				}else{
					$(this).removeClass("arranged");
				}
			});
			
			$("#arrange_left_num").html(Math.max(__book_arrange_left.count - _(__arranged).keys().length , 0));
			App.trigger("tweet_render_over");
		});
	},
	render:function(){
		this.$el.html($(this.template({self:this.model,core:this.model.toJSON(),view:this})));
	},
	on_import:function(){
		if (_(__arranged).keys().length >= 50) {
			__.fail("最多只能导入50篇日记噢，亲^^");
			return;
		};
		
		App.trigger("import_tweet",this.model);
		__arranged[this.model.id+""] = true;
		App.trigger("page_change");
	}
})
});//end of loadit