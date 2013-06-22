loadit("View.TweetWall",function(){
View.TweetWall = View.Tweet.extend({
	tagName: "div",
	className: "post clearfix",
	template: _.template(Template.TweetWall)
});
});//end of loadit