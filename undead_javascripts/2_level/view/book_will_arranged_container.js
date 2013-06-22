loadit("View.BookWillArrangedContainer",function(){
View.BookWillArrangedContainer = View.Base.extend({
	el: $(".arrange_left"),
	initialize:function(){
		this.on("page_change",function(page){
			this.$(".posts_sub").html("<div class='loading' ><img src='"+$_.static_url('/images/loading.gif')+"'></div>");
			this.model.fetch_page(page);
		});
		
		this.model.on("page_over",function(page_num){
			this.$(".posts_sub").html(
				__.empty_default(
					this.model.get_page(page_num).reduce(function(memo,tweet){
						return memo.add(tweet.setup_with(View.BookWillArranged).$el.data("message_id",tweet.id));
					},$()),
					'<div class="empty_tweet_notice" style="height:20px;">还没有日记</div>'
				)
			);
			
			App.trigger("page_change");
		},this);
		
		this.$("#pageinate_left").empty().pagination(this.model.count,{
			callback:function(page_index,jq,is_first) {
				this.trigger("page_change",page_index);
				if (! is_first) {$.scrollTo(0,0);}
			},
			link_to:"#",
			items_per_page: this.model.page_length,
			context: this,
			num_display_entries: 4
		});
	}
})
});//end of loadit
