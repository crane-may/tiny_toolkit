loadit("View.Timeline",function(){
View.Timeline = View.Base.extend({
	el:$("#posts"),
	initialize:function(){
		App.on("change:current_channel_id",function(m,chl_id,op){
			if (op && op.skip_tweets) { return };
			
			if (chl_id == this.model.channel.id){
				this.on("page_change",function(page){
					this.$el.html("<div class='loading' ><img src='"+$_.static_url('/images/loading.gif')+"'></div>");
					this.model.fetch({offset: page * this.model.line_length});
				});
				
				$("#pageinate").empty().pagination(this.model.count(), {
			  	callback: function(page_index,jq,is_first){
		  	    this.trigger("page_change",page_index);
						if (! is_first) {$.scrollTo($("#pageinate").parent().offset().top,0);}
			  	},
					link_to:"javascript:void(0)",
			  	items_per_page: this.model.line_length,
					context: this
				});
			}else{
				this.off("page_change");
			}
		},this);
		
		this.model.on("fetch_over",function(){
			this.$el.html(
				__.empty_default(
					this.model.reduce(function(memo,tweet){
						return memo.add(tweet.setup_with(View.Tweet,{dateTile:this.dateTile}).$el);
					},$(),this),
					'<div class="post not_exist">'+(this.model.channel.is_user() ? decodeURIComponent(this.$el.data("empty_user")) : decodeURIComponent(this.$el.data("empty")))+'</div>'
				)
			);
			App.delay_trigger(50,"tweet_render_over");
			if(! window.TS_TWEETS_COMPLETE) window.TS_TWEETS_COMPLETE = $.now();
		},this);
	}
})

});//end of loadit