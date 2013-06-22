loadit("Dialog.UserPromote",function(){
Dialog.UserPromote = Dialog.Base.extend({
	template: DialogTempl["user_promote"],
	height:300,
	width: 408,
	modal_option:{
		focus: false
	},
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		this.input_1 = this.$("input:eq(0)").ghost_input();
		this.input_2 = this.$("input:eq(1)").ghost_input();
	},
	on_yes: function() {
		ValidCenter(
			[
				function(){
					if (! this.input_1.ghost_input_val() ){
						__.fail("推荐日记地址不能为空");
						return false;
					}
					return true;
				}
			],
			function(){
				var content = this.input_1.ghost_input_val().trim() +"|"+this.input_2.ghost_input_val();
				$.fetch({
					type: "POST",
					url: "/feedbacks/recom_create",
					data: "desc="+encodeURIComponent(content),
					success: function(){
						__.success("推荐提交成功！");
						$.modal.close();
					}
				});
			}
		,this);
	}
})
});//end of loadit