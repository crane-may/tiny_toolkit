loadit("View.TagReadOnly",function(){
View.TagReadOnly = View.Tag.extend({
	events:{},
	initialize: function() {
		this.tag_class = this.model.is_user() ? "user_tags" : "chl_tags";
	},
	render: function() {
		this.update();
	},
	get_item: function(tag) {
		tag = tag.trim();
		if (tag == "") return $();
		var tar = $('<li class="'+this.tag_class+' round_corner_3 readonly_tag"><a class="tag_name" href="'+this.search_link(tag)+
									'">'+tag+'</a></li>');
		tar.hover(function() {
			tar.addClass("tag_hover");
		},function() {
			tar.removeClass("tag_hover");
		});
		
		return tar;
	},
	update: function() {
		if (this.model.get("tags").trim() != ""){
			var tags = this.model.get("tags").split(",");
			this.$el.append(_(tags).reduce(function(memo,tag){
				return memo.add(
						this.get_item(tag)
					);
			},$(),this));
		}else{
			this.$el.append(this.model.is_mine() ?
										'<li class="cGray2"><a href="/users/user_info">添加</a> 自己的标签</li>' :
										'<li class="cGray2" >TA还没有添加自己的标签</li>'
			)
		}
	}
})
});//end of loadit