loadit("Widget.LikeButton",function(){
Widget.LikeButton = Widget.Base.extend({
	initialize: function() {
		this.is_liked = this.model.get("reader_like_status");
		this.clike = this.model.get("clike");
	},
	render: function() {
		if (this.is_liked){
			this.$el.removeClass("like_link_bg").addClass("liked_link_bg").attr('title', '取消喜欢').html(this.clike);
			this.$el.unbind("click").jConfirmAction({ on_yes: function(){
				this.on_click();
				this.$el.next('.question').remove();
			} , on_yes_context: this , question:"您要取消喜欢吗？"});
		}else{
			this.$el.removeClass("liked_link_bg").addClass("like_link_bg").attr('title', '喜欢').html(this.clike);
			var self = this;
			this.$el.unbind("click").click(__.prevent(function(){
				self.on_click();
			}));
		}
    
    if (window.__mesure) {
      var like_level = 0;
      if (this.clike >= 1) like_level = 1;
      if (this.clike >= 3) like_level = 2;
      if (this.clike >= 5) like_level = 3;
      if (this.clike >=10) like_level = 4;
      if (this.clike >=20) like_level = 5;
      
      var tar = this.$el.closest(".tweet_byline").find(".mesure_icon");
      if (this.clike > 0)
        tar.removeClass("hidden").css({"background-position": "0px "+(like_level * -4)+"px" });
      else
        tar.addClass("hidden");
    }
		
		return this;
	},
	on_click: function() {
		if (this.is_liked){
			this.clike -= 1;
			this.model.unlike();
		}else{
			this.clike += 1;
			this.model.like();
		}
		this.is_liked = ! this.is_liked;
		this.render();
	}
})
});//end of loadit