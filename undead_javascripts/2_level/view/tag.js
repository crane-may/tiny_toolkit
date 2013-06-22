loadit("View.Tag",function(){
View.Tag = View.Base.extend({
	events:{
		"click .add_tags_btn a":"on_add_dialog"
	},
	initialize: function() {
		this.tag_class = this.model.is_user() ? "user_tags" : "chl_tags";
	},
	render: function() {
		this.$el.html('<ul class="tag_list clearfix"><li '+(this.model.is_user() ? 'class="tag_icon" title="个人标签"' : 'class="chl_tag_icon" title="主题标签"')+'></li><li class="left pl5 lh180 cGray2 empty_notice">暂无标签&nbsp;&nbsp;&nbsp;&nbsp;</li>'+
									( this.readonly ? '': '<li class="add_tags_btn"><a href="javascript:void(0)"><span class="add_tags_bg">&nbsp;</span>添加'+(this.model.is_user()?"新":"主题")+'标签</a></li>') +'</ul>' );
		this.update();
	},
	search_link: function(tag) {
		return (this.model.is_user() ? "/users" : "/channels" ) + '/search_by_tag?terms='+encodeURIComponent(tag);
	},
	get_item: function(tag) {
		tag = tag.trim();
		if (tag == "") return $();
		var tar = $('<li class="'+this.tag_class+' round_corner_3" ><a class="tag_name '+(this.readonly?"readonly_tag":"")+'" href="'+this.search_link(tag)+
									'">'+tag+'</a>'+(this.readonly ? '': '<a href="javascript:void(0)" class="del_tag"">x</a>')+'</li>');
		var self = this;
		tar.hover(function() {
			tar.addClass("tag_hover");
		},function() {
			tar.removeClass("tag_hover");
		});
		tar.find(".del_tag").click(__.prevent(function(){
			tar.remove();
			self.model.set("tags",
				_(self.$(".tag_name")).map(function(i){
					return $(i).html();
				}).join(",")
			);
			
			self.save();
		}));
		return tar;
	},
	update: function() {
		if (this.model.get("tags").trim() != ""){
			var tags = this.model.get("tags").split(",");
			this.$("."+this.tag_class).remove();
			this.$(".tag_icon,.chl_tag_icon").after(_(tags).reduce(function(memo,tag){
				return memo.add(
						this.get_item(tag)
					);
			},$(),this));
			this.$(".empty_notice").hide();
		}else{
			this.$("."+this.tag_class).remove();
			this.$(".empty_notice").show();
		}
	},
	on_add_dialog: function() {
		Dialog.AddTags.open(this.model,{view_tag: this });
	},
	add_tags: function(tags) {
		var new_ = tags.split(/[，,]/);
		var old_ = this.model.get("tags").split(",");
		var tags = _(_.union(old_,new_)).compact().join(",");
		
		this.save(function() {
			this.model.set("tags",tags);
			this.update();			
		},tags);
	},
	save: function(func,tags) {
		$.fetch({
			type:"POST",
			url: this.model.is_user() ? "/users/update" : "/channels/update/"+this.model.id ,
			data:"tags="+encodeURIComponent(tags || this.model.get("tags")),
			success:function(){
				if(func) func.call(this);
				$.modal.close();
			},
			context:this
		});
	}
})
});//end of loadit