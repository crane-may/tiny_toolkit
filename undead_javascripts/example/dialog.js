loadit("Dialog.",function(){
Dialog. = Dialog.Base.extend({
	template: DialogTempl[""],
	height:,
	width: ,
	modal_option:{
		focus: false
	},
	events:{
		"click .yes":"on_"
	},
	onShow: function() {
		this.input = this.$("input").ghost_input();
	},
	on_: function() {
	}
})
});//end of loadit