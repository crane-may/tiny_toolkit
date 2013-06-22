loadit("Dialog.Talk",function(){
Dialog.Talk = Dialog.Base.extend({
	template: DialogTempl["talk"],
	height:270,
	width: 479,
	modal_option:{
		focus: false
	},
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		this.input_name_jq = this.$("input").ghost_input();
		this.input_name = this.$("input").valid_view(Valid.Base);
		this.input_content = this.$("textarea").valid_view(Valid.Base);
		
		if(this.receiver_name) this.input_name_jq.attr("readonly","readonly").val(this.receiver_name).addClass("input_disable");
		this.$(".letter_smile").empty().smile_dropdown(this.$("#letter_content"),true);
		
		if (this.on_showed) this.on_showed.call(this);
	},
	get_content: function() {
		return _.escape(this.input_content.val());
	},
	on_yes: function() {
		ValidCenter(
			[function() {
				if (this.input_name_jq.ghost_input_val().trim() == ""){
					__.fail("用户名不能为空");
					return false;
				}else{
					return true;
				}
			},this.input_name,this.input_content],
			function() {
				$.fetch({
		  		type:"POST",
		  		url:"/letters/talk/"+encodeURIComponent(this.input_name.val())+"?name=true",
		  		data:JSON.stringify({"content": this.get_content() }),
		  		success:function(){
		  			$.modal.close();
		  			__.success("发送成功");
		  		}
		  	});
			}
		,this);		
	}
})
});//end of loadit