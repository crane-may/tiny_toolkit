loadit("View.MessagesClassifyTimeline",function(){

View.MessagesClassifyTimeline = View.Base.extend({
	el:$("#posts"),
	initialize:function(){
		App.on("change:current_classify",function(m,lid){
			this.$el.html("<div class='loading' ><img src='"+$_.static_url('/images/loading.gif')+"'></div>");
			this.model.fetch({classify:lid});
		},this);
		
		this.model.on("fetch_over",function(){
			this.$el.empty().append(
				this.model.reduce(function(memo,tweet){
					return memo.add(tweet.setup_with(View.TweetWall).$el);
				},$(),this)
			);
			
			App.delay_trigger(50,"tweet_render_over");
		},this);
	}
})

});//end of loadit