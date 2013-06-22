loadit("Widget.LikeSingleButton",function(){
Widget.LikeSingleButton = Widget.Base.extend({
	initialize: function() {
    // this.is_liked = this.$el.data();
    // this.clike = ;
	},
	render: function() {
		if (this.is_liked){
			this.$el.removeClass("like_icon").addClass("liked_icon");
			this.$el.unbind("click");
      
      this.$el.closest(".unit_wrap").find(".vote_number").html("× " + (this.clike > 999 ? "999+" : this.clike) );
		}else{
			var self = this;
			this.$el.unbind("click").click(__.prevent(function(){
				self.on_click();
			}));
		}
    
		return this;
	},
	on_click: function() {
		if (! this.is_liked){
			this.clike += 1;
			this.model.like();
		}
		this.is_liked = ! this.is_liked;
		this.render();
	}
})
});//end of loadit