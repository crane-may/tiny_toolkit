loadit("View.TweetHot",function(){
View.TweetHot = View.Tweet.extend({
	tagName: "div",
	className: "post clearfix",
	template: _.template(Template.TweetHot)
});
});//end of loadit