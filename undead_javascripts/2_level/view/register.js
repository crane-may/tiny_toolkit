loadit("View.Register",function(){
View.Register = View.Base.extend({
	el: $(".register"),
	events: {
		"click .captcha_swap": "on_captcha_swap",
		"click .privacy_link span": "on_agree",
		"click .privacy_link input,.privacy_link span": "on_agree_wrap",
		"click #register_btn": "on_register"
	},
	initialize:function(){
		this.form = $('#reg_form');
		this.input_email = this.$("#email_input").valid_view(Valid.Underline,{
			remote:{
				url: function(s) {return "/users/check_email?email="+encodeURIComponent(s);},
				error: '此邮箱已被注册，<a href="/login">登录?</a>'
			},
			check_list_extend: ["remote"]
		});
		this.input_password = this.$("#password_input").valid_view(Valid.Underline);
		this.input_password_confirm = this.$("#password_input_confirm").valid_view(Valid.Underline,{
			exter:{
				valid: function(s) {
					return s == this.input_password.val();
				},
				error: '两次输入的密码不一致，请重新输入',
				context: this
			},
			check_list_extend: ["exter"]
		});
		this.input_captcha = this.$("#captcha_input").valid_view(Valid.Underline,{
			remote:{
				url: function(s) {return "/registrations/check_captcha?captcha="+encodeURIComponent(s);},
				error: '验证码输入错误'
			},
			check_list_extend: ["remote"]
		});
		this.input_argee = this.$("#policy_agree");
		this.input_argee_error = this.$("#policy_agree_valid_info");
		this.input_name = this.$("#name_input").valid_view(Valid.Underline,{
			remote:{
				url: function(s) {return "/registrations/check_name?name="+encodeURIComponent(s);},
				error: '此用户名已被使用，请换一个'
			},
			check_list_extend: ["remote"]
		});
	},
	render:function(){},
	on_captcha_swap:function(event){
		this.$("#captcha_img").html('<img src="/users/show_captcha_image?k='+$.now()+'" class="left"/>');
	},
	on_agree: function() {
		this.input_argee.attr("checked",! this.input_argee.attr("checked"));
	},
	on_agree_wrap: function() {
		this.input_argee_error.hide();
	},
	on_register: function() {
		ValidCenter(
			[
				this.input_email,
				this.input_password,
				this.input_password_confirm,
				this.input_name,
				this.input_captcha,
				function(){
					if (! this.input_argee.attr("checked")){
						this.input_argee_error.show();
						return false;
					}else{
						return true;
					}
				}
			],
			function() {
				var self = this;
				$.ajax({
				  type: "POST",
					url: "/users",
					data: this.form.serialize(),
					dataType: 'json',
					beforeSend:function(jqXHR,settings){
					  jqXHR.setRequestHeader('X-CSRF-Token', $_.csrf_token());
					},
					success : function(result){
						App.goto("/users/guide")
					},
					error : function(a){
						if (a){
						  if (a.status == 417 && (a.response || a.responseText)){
								var response = a.response || a.responseText;
					      var err = eval("["+response+"]")[0];

								if (err){
									self.dis_error(err);
								}
							}
							if (a.status == 418){
							}
						}else{
							noti_fail("创建失败");
						}
					}
				});
			}
		,this);
	},
	dis_error: function(ret) {
		var posed_error;
		if (ret["password"]){
			posed_error = {pos:this.input_password, msg: __.chs_error(ret["password"],"密码长度应该在6～40个字符")};
		}
		if (ret["password_input_confirm"]){
			posed_error = {pos:this.input_password_confirm , msg: __.chs_error(ret["password_input_confirm"], "密码长度应该在6～40个字符") };
		}
		if (ret["email"]){
			posed_error = {pos:this.input_email, msg: __.chs_error(ret["email"], "邮箱长度应该在6～40个字符")};
		}
		if (ret["captcha"]){
			posed_error = {pos:this.input_captcha, msg: __.chs_error(ret["captcha"], "验证码错误")};
			
			this.on_captcha_swap();
			this.input_captcha.val("");
		}
    if (ret["name"]){
			posed_error = {pos:this.input_name, msg: __.chs_error(ret["name"], "用户名已被注册")};
		}
		var ret_ = ret;
		_.delay(function(){
			if (posed_error)
				posed_error.pos.dis_error( posed_error.msg );
			else
				__.fail(__.chs_error(ret_["normal"]));
		},100);
	}
})
});//end of loadit