loadit("View.MessagesListTimeline",function(){

View.MessagesListTimeline = View.Base.extend({
	el:$("#posts"),
	is_first:true,
	initialize:function(){
		this.loading = $("#load_more_loading");
		App.on("load_more",function(op){
			this.loading.show();
			this.model.fetch({add:true});
		},this);
		
		this.model.on("fetch_over",function(count){
			if (this.model.length - count == 0) App.trigger("no_load_more");
			
			var tars = null;
			$(".posts_wrap").addClass("posts_wrap_bg");
			this.$el.append(
				tars = _(this.model.rest(count)).reduce(function(memo,tweet){
					return memo.add(tweet.setup_with(View.TweetWall,{no_time:true}).$el);
				},$(),this)
			);
			if (this.is_first) {
				this.is_first = false;
				if (tars && $("#quick_entry").length > 0) tars.first().after($("#quick_entry").remove().show());
			}
			
			this.loading.hide().find("div").css({padding:"20px",height:"16px","line-height":"16px"});
			App.delay_trigger(50,"tweet_render_over");
			App.trigger("load_more_done");
		},this);
	}
})

});//end of loadit