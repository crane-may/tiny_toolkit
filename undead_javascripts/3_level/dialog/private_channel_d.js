loadit("Dialog.PrivateChannel",function(){
Dialog.PrivateChannel = Dialog.Base.extend({
	template: DialogTempl["private_channel"],
	height:240,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
	},
	on_yes: function() {
	  $.fetch({
			type: "POST",
			url: "/channels/update/"+this.model.id,
			data: "level=1",
			success : function(result){
				__.success("设为隐私主题成功！");
				App.refresh();
			}
		});
	}
})
});//end of loadit