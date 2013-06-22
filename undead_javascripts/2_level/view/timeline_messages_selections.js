loadit("View.MessagesSelectionsTimeline",function(){
View.MessagesSelectionsTimeline = View.Base.extend({
	el:$("#posts"),
	is_first:true,
	initialize:function(){
		this.loading = $("#load_more_loading");
		this.mid_store = {};
		
		App.on("change:current_selection",function(m,lid){
			this.$el.empty();
			this.is_first = true;
			App.trigger("refresh_load_more");
			App.trigger("load_more");
			this.mid_store = {};
			this.loading.find("div").removeClass("loading_short");
		},this);
		
		App.on("load_more",function(page) {
			this.loading.show();
			this.model.fetch({selection:App.get("current_selection"),page:(_.isUndefined(page) ? null : page + 1)});
		},this);
		
		this.model.on("fetch_over",function(){
			var addition = this.model.reduce(function(memo,tweet){
				if (! this.mid_store[tweet.id]) {
					this.mid_store[tweet.id] = true;
					return memo.add(tweet.setup_with(this.tweet_view || View.TweetHot,{no_time:true}).$el);
				}else{
					return memo;
				}
			},$(),this);
			
			if (addition.length > 0) {
				this.$el.append(addition);
				
				if (this.is_first) {
					this.is_first = false;
					addition.first().after("<div class='breakline'></div>")
						.addClass("post_promote").addClass("boxshadowN")
						.find(".entry_wrap").prepend("<div class='promote_flag'></div>").append("<div class='promote_corner'></div>")
						.find(".entry").removeClass("boxshadowN")
						.find(".byline").prepend(Widget.ShareLine(this.model.at(0).id,this.model.at(0).get("channel_name"),App.get("current_selection_name")))
				// 	addition.first().after($("#topic_ad").remove().show());
				}
			}else{
				App.trigger("no_load_more");
			}

			this.loading.hide().find("div").addClass("loading_short");
			App.delay_trigger(50,"tweet_render_over");
			App.trigger("load_more_done");
		},this);
	}
})

});//end of loadit
