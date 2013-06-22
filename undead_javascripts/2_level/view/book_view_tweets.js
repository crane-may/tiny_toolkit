loadit("View.BookViewTweets",function(){
View.BookViewTweets = View.Base.extend({
	tagName: "div",
	className: "book_content clearfix",
	initialize:function(){
	},
	render: function() {
		this.$el.html("<h3 class='alR'></h3>");
		if (this.tweet_list && this.tweet_list.length > 0) {
			_(this.tweet_list).each(function(i) {
				var tw = new Mod.Tweet(this.tweets_dic[i]);
				tw.no_del_btn = true;
				this.$el.append(tw.setup_with(View.Tweet).$el);
			},this);
		}
	},
	update_name: function(name) {
		this.$("h3").html("<span class='left lh24'>"+_.escape(name).replace(/ /g,"&nbsp;")+"</span><span class='f12px cGray2'>"+
		(this.tweet_list ? this.tweet_list.length : 0)+"篇日记</span>");
	}
})

});//end of loadit