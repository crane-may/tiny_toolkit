loadit("Dialog.Login",function(){
Dialog.Login = Dialog.Base.extend({
	template: DialogTempl["login"],
	height: 235,
	modal_option:{
		focus: false
	},
	events:{
		"click .yes":"on_yes",
		"click .forget_pwd":"on_forget"
	},
	onShow: function() {
		this.input_email = this.$("#guest_email");
		this.input_pwd = this.$("#guest_pwd");
		var self = this;
		this.input_pwd.on_enter(function() {
			self.on_yes();
		});
	},
	on_forget:function() {
	},
	on_yes: function() {
		ValidCenter(
			[
				function() {
					if(! __.validate_email_lite(this.input_email.val().trim())){
						__.fail("输入邮箱格式错误");
						return false;
					}else{
						return true;
					}
				},
				function() {
					if (this.input_pwd.val().length < 6){
						__.fail("请输入6位或6位以上密码");
						return false;
					}else{
						return true;
					}
				}
			],
			function(){
				$.ajax({
					type:"POST",
					url:"/login_a?user_id="+(this.from_user_id ? this.from_user_id : "" ),
					dataType: 'json',
					data:"user[email]="+encodeURIComponent(this.input_email.val().trim())+"&user[password]="+encodeURIComponent(this.input_pwd.val())+
						 "&user[remember_me]="+($("#login_remember_me").attr("checked") ? 1 : 0),
					beforeSend:function(jqXHR,settings){
					  jqXHR.setRequestHeader('X-CSRF-Token', $_.csrf_token());
					},
					success:function(){
						App.refresh();
					},
					error:function(){
						__.fail("邮箱或密码错误");
					}
				})
			}
		,this);
	}
})
});//end of loadit