loadit("View.TweetPin",function(){
View.TweetPin = View.Base.extend({
	tagName: "a",
	className: "col",
	template: _.template(Template.TweetPin),
	// events: {
	// 	"mouseenter" : "on_mouseenter",
	// 	"mouseleave" : "on_mouseleave"
	// },
	initialize:function(){
		this.pic = this.$("img");
		this.$el.attr("href","/m/"+this.model.id);
		this.$el.attr("target","_blank");
	},
	render:function(){
		this.$el.html(this.template({self:this.model,core:this.model.toJSON()}));
	}
	// on_mouseenter: function() {
	// 	this.pic.addClass("col_hover");
	// },
	// on_mouseleave: function() {
	// 	this.pic.removeClass("col_hover");
	// }
})
});//end of loadit
