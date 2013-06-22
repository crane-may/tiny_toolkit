loadit("Dialog.PublicChannel",function(){
Dialog.PublicChannel = Dialog.Base.extend({
	template: DialogTempl["public_channel"],
	height:200,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
	},
	on_yes: function() {
	  $.fetch({
			type: "POST",
			url: "/channels/update/"+this.model.id,
			data: "level=0",
			success : function(result){
					__.success("设为公开主题成功！");
					App.refresh();
			}
		});
	}
})
});//end of loadit