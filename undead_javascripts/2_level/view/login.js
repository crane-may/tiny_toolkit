loadit("View.Login",function(){
__.fail = function(s) {
	$("#page_error p").removeClass("hidden").html(s);
};

__.fail_recover = function() {
	$("#page_error p").addClass("hidden");
}

View.Login = View.Base.extend({
	el: $(".login"),
	events: {
		"click #login_btn": "on_login",
		"click #forget_a": "on_forget_pwd",
		"click .login_extra_opt span": "on_remember_me",
		"click #login_clear": "on_clear",
		"focus #login_account": "on_focus",
		"blur #login_account": "on_blur"
	},
	initialize: function() {
		this.input_email = this.$("#login_account");
		this.input_pwd = this.$("#password");
		this.login_form = this.$('form');
		this.input_remember_me = this.$("#remember_me");
		
		var self = this;
		this.input_pwd.on_enter(function(){
			self.on_login();
		});
		
		this.support_ustore = USTORE.init();
		if (this.support_ustore) {
			var s = USTORE.getValue("ibooloo_login_email");
			if (! _.isString(s)) s="";
			this.input_email.val(s);
		}
		
		if ($.browser.msie && ! __.ie10){
			$(".inputbox").each(function() {
				var self = $(this);
				var tar = $("<span class='placeholder'>"+self.attr("placeholder")+"</span>");
				self.focus(function() {
					tar.hide().unbind("click");
				});
				self.blur(function() {
					if (self.val() == "") {
						tar.show();
						tar.click(function() {
							self.focus();
						});
					}
				})
				self.before(tar);
				if (self.val() != "") {
					tar.hide();
				}else{
					tar.click(function() {
						self.focus();
					});
				}
			});
		}
		this.on_blur();
	},
	on_login: function() {
		ValidCenter(
			[
				function() {
					if (this.input_email.val().trim() == ""){
						__.fail("请输入登录邮箱");
						return false;
					}else if (!__.validate_email_lite(this.input_email.val().trim())){
						__.fail("输入邮箱格式错误");
						return false;
					}else{
						return true;
					}
				},
				function() {
					if (this.input_pwd.val().length < 6){
						__.fail("邮箱或密码错误");
						return false;
					}else{
						return true;
					}
				}
			],
			function(){
				if (this.support_ustore){
					USTORE.setValue("ibooloo_login_email",this.input_email.val().trim());
				}
				this.login_form[0].submit();
			}
		,this);
	},
	on_remember_me: function() {
		this.input_remember_me.attr("checked" , ! this.input_remember_me.attr("checked"));
	},
	on_forget_pwd: function() {
		Dialog.ForgetPassword.open(null,{"email": this.input_email.val()});
	},
	on_clear: function() {
		this.input_email.val("");
		this.input_pwd.val("");
		this.input_email.blur();
		this.input_pwd.blur();
		if (this.support_ustore) USTORE.setValue("ibooloo_login_email","");
	},
	on_focus: function() {
		$("#login_clear").hide();
		__.fail_recover();
	},
	on_blur: function() {
		if (this.input_email.val() != "") 
			$("#login_clear").show();
		else
			$("#login_clear").hide();
	}
})
	
});// end of loadit