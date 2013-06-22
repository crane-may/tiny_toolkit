loadit("View.Tongue",function(){
View.Tongue = View.Base.extend({
	tagName: "li",
	template: _.template(
		'<a class="deliver_item word_shortcut" href="javascript:void(0);"><#= core.name.channel_name() #></a>'
	),
	events: {
		"click a": "on_choose"
	},
	initialize:function(){
		App.on("goto_channel",function(cid,refresh_scope) {  //refresh_scope 2 - not change current_channel_id;  1 - change current_channel_id with skip_tweets; 0 - change all
			if (cid == this.model.id) this.on_choose(refresh_scope);
		},this);
	},
	render:function(){
		this.$el.html(this.template({self:this.model,core:this.model.toJSON()}));
		this.add_class();
	},
	add_class: function(tar) {
		this.$el.addClass( this.model.level() + "_li" )
				.find("a").addClass( this.model.level()  );
	},
	on_choose:function(refresh_scope){
		if ($(window).scrollTop() - (this.tongues.$el.offset().top - 40) > 300){
			$.scrollTo((this.tongues.$el.offset().top - 40),200);
		}
		this.$el.parent().find(".on").removeClass("on");
		this.$el.find(".deliver_item").addClass("on");
		if (refresh_scope == 2) {
			return;
		}else if (refresh_scope == 1){
			App.set("current_channel_id",this.model.id,{force_change:true,skip_tweets:true});
		}else{
			App.set("current_channel_id",this.model.id,{force_change:true});
		}
	}
})

View.Tongues = View.Base.extend({
	el:$("#navbox .nav"),
	initialize:function(){},
	tongue: View.Tongue,
	render:function(){
		this.$el.html(
			this.model.reduce(function(memo,tongue){
				return memo.add(tongue.setup_with(this.tongue,{tongues: this}).$el);
			},$(),this)
		);
	}
})

View.TongueGuest = View.Tongue.extend({
	initialize: function() {
		View.Tongue.prototype.initialize.call(this);
		App.on("follow_map_change",function(cids){
			if (cids[0] == this.model.id) {
				this.model.set("followed_by",cids[1]);
				this.add_class();
			}
		},this);
	},
	add_class: function(tar) {
		this.$el.removeClass("public_li chl_followed_li").addClass( this.model.get("followed_by") ? "chl_followed_li" : "public_li" )
				.find("a").removeClass("public chl_followed").addClass( this.model.get("followed_by") ? "chl_followed" : "public" );
	}
})

View.TonguesGuest = View.Tongues.extend({
	tongue: View.TongueGuest
})

});//end of loadit