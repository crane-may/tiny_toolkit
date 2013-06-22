loadit("View.Similar",function(){
View.Similar = View.Base.extend({
	el: $("#similar_box_wrapper"),
	template: _.template(Template.Similar),
	initialize:function(){
		this.header = this.$("h2");
		this.box = this.$("div");
		App.on("change:current_channel_id",function(m,cid) {
			this.$el.hide();
			var self = this;
			_.delay(function(){ self.load(); },500);
		},this);
	},
	render:function(){
		var self = this;
		_.delay(function(){ self.load(); },500);
	},
	load: function() {
		var cid = App.get("current_channel_id");
		if (! cid) return;
		cid = cid + "";
		var controller = /^user_/.test(cid) ? "users":"channels";
		var raw_id = cid.replace(/^user_/,"");
		this.header.html(/^user_/.test(cid) ? "猜您喜欢的人":"猜您喜欢的主题");
		
		$.fetch({
			url:"/"+controller+"/guess_"+controller+"/"+raw_id,
			type: "GET",
			cache:true,
			noti:"no",
			context: this,
			success:function(ret){
				var ids = [window.CURRENT_USER_ID];
				if (ret.length > 0){
					this.box.html(
						_(ret).map(function(i){
							if (! _(ids).include(i.id)){
						    ids.push(i.id);
							  return this.template({core:i});
							}else{return "";}
						},this).join("")
					);	
					this.$el.show();
				}else{
					this.$el.hide();
				}
			}
		});
	}
})
});//end of loadit