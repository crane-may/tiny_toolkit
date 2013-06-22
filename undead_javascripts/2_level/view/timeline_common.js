loadit("View.CommonTimeline",function(){

View.CommonTimeline = View.Base.extend({
	el:$("#posts"),
	initialize:function(){
		this.model.on("fetch_over",function(){
			this.$el.html(
				__.empty_default(
					this.model.reduce(function(memo,tweet){
						return memo.add(tweet.setup_with(View.Tweet).$el);
					},$()),
					'<div class="post empty_tweet_notice"><span class="cGray2">'+this.$el.data("empty")+'</span></div>'
				)
			);
			App.delay_trigger(50,"tweet_render_over");
		},this);
	},
	render: function() {
		this.on("page_change",function(page){
			this.$el.html("<div class='loading' ><img src='"+$_.static_url('/images/loading.gif')+"'></div>");
			this.model.fetch({url: this.url(page) });
		});

		$("#pageinate").empty().pagination(this.count, {
	  	callback: function(page_index,jq, is_first){
  	    this.trigger("page_change",page_index);
				if (! is_first) {$.scrollTo($("#pageinate").parent().offset().top,0);}
	  	},
			link_to:"javascript:void(0)",
	  	items_per_page: this.model.line_length,
			context: this
		});
	}
})

});//end of loadit