loadit("Dialog.Input-link",function(){
Dialog.InputLink = Dialog.Base.extend({
	template: DialogTempl["input_link"],
	height:230,
	width: 408,
	modal_option:{
		focus: false
	},
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		this.input_address = this.$("input:eq(0)").ghost_input();
		this.input_name = this.$("input:eq(1)").ghost_input();
		
		if (this.name) this.input_name.val(this.name);
	},
	on_yes: function() {
		ValidCenter(
			[
				function(){
					if (! this.input_address.ghost_input_val() ){
						__.fail("链接地址不能为空");
						return false;
					}
					return true;
				}
			],
			function(){
				var address = this.input_address.ghost_input_val().trim();
				var name = this.input_name.ghost_input_val() || address ;
				if(this.callback){
					this.callback(' <a href="'+encodeURI(address.indexOf("http://") < 0 ? "http://"+address : address)+'">'+name+'</a> ');
					$.modal.close();
				}
			}
		,this);
	}
})
});//end of loadit