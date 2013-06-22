loadit("Dialog.Input-at",function(){
Dialog.InputAt = Dialog.Base.extend({
	template: DialogTempl["input_at"],
	height:155,
	width: 408,
	modal_option:{
		focus: false
	},
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		this.input_name_jq = this.$("input").ghost_input();
		this.input_name = this.input_name_jq.valid_view(Valid.Base);
	},
	on_yes: function() {
		ValidCenter(
			[
				function(){
					if (! this.input_name_jq.ghost_input_val()){
						__.fail("用户名不能为空");
						return false;
					}else
						return true;
				},
				this.input_name
			],
			function(){
				var name = this.input_name.val();
				if(this.callback){
					this.callback(' &nbsp;<a href="/userpage/0?name='+encodeURIComponent(name)+'">@'+name+'</a>&nbsp; ');
					$.modal.close();
				} 
			}
		,this);
	}
})
});//end of loadit