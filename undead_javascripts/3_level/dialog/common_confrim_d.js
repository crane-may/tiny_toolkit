loadit("Dialog.CommonConfirm",function(){
Dialog.CommonConfirm = Dialog.Base.extend({
	template: DialogTempl["common_confirm"],
	height:200,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		this.$(".note_area").html(this.note);
		this.$(".dialog_header").html(this.title);
	},
	on_yes: function() {
		if (this.callback)
			this.callback.call(this.callback_context);
	}
})
})// end of loadit