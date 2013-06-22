loadit("View.BookArrangedContainer",function(){
View.BookArrangedContainer = View.Base.extend({
	el:$(".arrange_right"),
	initialize:function(){
		this.model.each(function(menu) {
			menu.timeline.setup_with(View.BookArrangedContainerMenu);
		});
		
		App.on("change:current_selectbox_select_id",function(m,select_id) {
			this.current_timeline = this.model.get(select_id).timeline;
			this.$el.html("<div class='loading' ><img src='"+$_.static_url('/images/loading.gif')+"'></div>");
			this.current_timeline.fetch();
		},this);
		
		App.on("import_tweet",function(tweet) {			
			tweet.import_to = this.current_timeline;
			
			if(this.$(".entry").length == 0) this.$el.empty();
			var tar = tweet.setup_with(View.BookArranged);
			tar.$el.hide();
			this.$el.append(tar.$el);
			tar.$el.slideDown("fast");
			
			this.current_timeline.add(tweet);
			this.current_timeline.dirty = true;$.open_unsave_alert("目录修改未保存");
		},this);
		
		App.on("page_change",function() {
			$("#arrange_right_num").html(50 - _(__arranged).keys().length);
			
			$(".arrange_right .moveto").removeClass("disabled");
			$(".arrange_right .moveup:first").addClass("disabled");
			$(".arrange_right .movedown:last").addClass("disabled");
			
			App.trigger("tweet_render_over");
		});
		
		this.model.setup_into(Widget.SelectBox, $("#select_menu"),{current_menu_id: this.model.first().id});
	}
});

View.BookArrangedContainerMenu = View.Base.extend({
	el:$(".arrange_right"),
	initialize: function() {
		this.model.on("fetch_over",function(){
			this.$el.html(
				__.empty_default( 
					this.model.reduce(function(memo,tweet){
						return memo.add(tweet.setup_with(View.BookArranged).$el);
					},$()),
					'<div class="empty_tweet_notice" style="height:20px;">还没有日记</div>'
				)
			);
			
			App.trigger("page_change");
		},this);
	}
});

});//end of loadit