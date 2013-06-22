loadit("Dialog.DelChannel",function(){
Dialog.DelChannel = Dialog.Base.extend({
	template: DialogTempl["del_channel"],
	height:195,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {},
	on_yes: function() {
		$.fetch({
			type: "POST",
			url: "/channels/delete/" + this.model.id,
			success : function(result){
					__.success("删除成功！");
					App.refresh();
			}
		});
	}
})
});//end of loadit