loadit("Dialog.Input-preview",function(){
Dialog.Preview = Dialog.Base.extend({
	template: DialogTempl["preview"],
	height:530,
	width:677,
	modal_option:{
		focus: false,
		containerCss: {
			height:530,
			width:677
		}
	},
	events:{},
	onShow: function() {
		this.$("#preview_dialog_content").html(_$.cccode_html( this.content ));
	}
})
});//end of loadit