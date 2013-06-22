loadit("Dialog.CommonNotice",function(){
Dialog.CommonNotice = Dialog.Base.extend({
	template: DialogTempl["common_notice"],
	height:160,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		this.$(".note_area").html(this.note);
		this.$(".dialog_header").html(this.title);
	},
	on_yes: function() {
		$.modal.close();
	}
})
})// end of loadit