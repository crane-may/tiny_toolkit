loadit("Dialog.RenameChannel",function(){
Dialog.RenameChannel = Dialog.Base.extend({
	template: DialogTempl["rename_channel"],
	height:155,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		this.name_input = this.$("input").valid_view(Valid.Base);
		this.name_input.val(this.model.get("name"));
	},
	on_yes: function() {
		ValidCenter(
			this.name_input,
			function(){
				$.fetch({
					type: "POST",
					url: "/channels/update/"+this.model.id,
					data: "channel[name]="+this.name_input.val(),
					success: function(){
						__.success("更新成功！");
						App.refresh();
					}
				});
			}
		,this);
	}
})
});//end of loadit