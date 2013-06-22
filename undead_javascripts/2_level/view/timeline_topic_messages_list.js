loadit("View.TopicMessagesListTimeline",function(){

// View.TopicMessagesListTimeline = View.Base.extend({
//   el:$("#posts"),
//   initialize:function(){
//     this.loading = $("#load_more_loading");
//     App.on("load_more",function(op){
//       this.loading.show();
//       this.model.fetch({add:true, topic_id:__topic_id});
//     },this);
//     
//     this.model.on("fetch_over",function(count){
//       if (this.model.length - count == 0) App.trigger("no_load_more");
//       
//       this.$el.append(
//         _(this.model.rest(count)).reduce(function(memo,tweet){
//           return memo.add(tweet.setup_with( this.tweet_template || View.Tweet).$el);
//         },$(),this)
//       );
//       this.loading.hide().find("div").css({padding:"20px",height:"16px","line-height":"16px"});
//       App.delay_trigger(50,"tweet_render_over");
//       App.trigger("load_more_done");
//     },this);
//     
//     App.on("reload",function() {
//       this.loading.show();
//       this.$el.empty();
//       this.model.reset_empty();
//       this.model.fetch({topic_id:__topic_id});
//     },this);
//   }
// })

View.TopicMessagesListTimeline = View.Base.extend({
	el:$("#posts"),
	initialize:function(){
		this.model.on("fetch_over",function(){
			this.$el.html(
				__.empty_default(
					this.model.reduce(function(memo,tweet){
						return memo.add(tweet.setup_with(this.tweet_template || View.Tweet,{last_time: this.model.last_time, page: this.page }).$el);
					},$(),this),
					'<div class="post empty_tweet_notice"><span class="cGray2">'+this.$el.data("empty")+'</span></div>'
				)
			);
			App.delay_trigger(50,"tweet_render_over");
		},this);
	},
	render: function() {
		this.on("page_change",function(page){
			this.$el.html("<div class='loading' ><img src='"+$_.static_url('/images/loading.gif')+"'></div>");
			this.model.fetch({topic_id : __topic_id, page: page});
      this.page = page;
		},this);
    
    App.on("reload",function() {
      this.model.last_time = "";
      this.trigger("page_change",0);
    },this);

		$("#pageinate").empty().pagination(this.count, {
	  	callback: function(page_index,jq, is_first){
  	    this.trigger("page_change",page_index);
				if (! is_first) {$.scrollTo($("#pageinate").parent().offset().top,0);}
	  	},
			link_to:"javascript:void(0)",
	  	items_per_page: this.model.line_length,
			context: this,
      current_page: __page
		});
	}
})


});//end of loadit