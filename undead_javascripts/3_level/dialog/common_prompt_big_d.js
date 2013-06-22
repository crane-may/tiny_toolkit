loadit("Dialog.CommonPromptBig",function(){
Dialog.CommonPromptBig = Dialog.Base.extend({
	template: DialogTempl["common_prompt_big"],
	height: 230,
	width: 400,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		this.input = this.$("input");
		this.$(".dialog_header span").html(this.title);
		this.$("input").val(this.default_value || "");
		if (this.valid){
			this.$("input").attr("data-valid",this.valid);
			this.input = this.$("input").valid_view(Valid.Base);
		} else {
			this.input = this.$("input");
		}
	},
	on_yes: function() {
		if (this.valid){
			ValidCenter(
				[this.input,
				this.extra_valid ? (function(){
						var s = this.input;
						return function(){return this.extra_valid(s)};
					}).call(this) : 
					function(){return true}],
				function(){
				this.callback.call(this.callback_context,this.input);
			},this);
		}else{
			this.callback.call(this.callback_context,this.input);
		}
	}
})
});//end of loadit