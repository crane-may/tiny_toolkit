loadit("View.InDayTimeline",function(){

View.InDayTimeline = View.Base.extend({
	el:$("#posts"),
	initialize:function(){
		App.on("messages_in_day",function(dateText){
			this.on("page_change",function(op){
				this.$el.html("<div class='loading' ><img src='"+$_.static_url('/images/loading.gif')+"'></div>");
				this.model.fetch({offset: op.page * this.model.line_length,time: op.time});
			});
			
			var dateText_ = dateText;
			$("#pageinate").empty().pagination(this.model.count(), {
		  	callback: function(page_index,jq,is_first){
	  	    this.trigger("page_change",{page:page_index,time:dateText_});
					if (! is_first) {$.scrollTo($("#pageinate").parent().offset().top,0);}
		  	},
				link_to:"javascript:void(0)",
		  	items_per_page: this.model.line_length,
				context: this
			});
			
			App.trigger("goto_channel",__user.id,2);
		},this);
		
		App.on("change:current_channel_id",function(m,chl_id){
			this.off("page_change");
		},this);
		
		this.model.on("fetch_over",function(count){
			this.$el.html(
				__.empty_default(
					this.model.reduce(function(memo,tweet){
						return memo.add(tweet.setup_with(View.Tweet,{dateTile:this.dateTile}).$el);
					},$(),this),
					'<div class="post empty_tweet_notice">没有日记</div>'
				)
			);
			App.delay_trigger(50,"tweet_render_over");
			if (_.isNumber(count)) $("#pageinate").pagination(count);
		},this);
	}
})

});//end of loadit