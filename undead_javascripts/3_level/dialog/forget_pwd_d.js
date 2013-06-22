loadit("Dialog.ForgetPassword",function(){
Dialog.ForgetPassword = Dialog.Base.extend({
	template: DialogTempl["forget_pwd"],
	height:205,
	modal_option:{
		focus: false
	},
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		this.input_email_jq = this.$("input").ghost_input();
		if (this.email) this.input_email_jq.val(this.email);
	},
	on_yes: function() {
		ValidCenter(
			[
				function() {
					if (!__.validate_email_lite(this.input_email_jq.val().trim())){
						__.fail("请输入正确邮箱地址");
						return false;
					}else{
						return true;
					}
				}
			],
			function(){
				$.fetch({
		      type:"POST",
		      url:"/send_reset_password_link",
		      data:"user[email]="+this.input_email_jq.val().trim(),
		      success:function (){
		        $.modal.close();
						_.delay(function() {
							Dialog.CommonNotice.open(null,{
								title: "重置密码",
								note: '<h2><span class="notify_icon"></span>重置密码邮件已发送成功，</h2><h2>请查看您的邮件，点击邮件中的重置密码链接重置密码！</h2>'
							})
						},1500);
		 	  	}
	    	});
			}
		,this);
	}
})
})// end of loadit