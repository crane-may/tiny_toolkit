var pwd = $("#new_password").valid_view(Valid.Underline,{
	dis_error_span: $("#new_password_valid_info")
});

var confirm_pwd = $("#confirm_password").valid_view(Valid.Underline,{
	dis_error_span: $("#confirm_password_valid_info"),
	exter:{
		valid: function(s) {
			return s == pwd.val();
		},
		error: '两次输入的密码不一致，请重新输入'
	},
	check_list_extend: ["exter"]
});

$("#edit_user_info").click(__.prevent(function() {
	ValidCenter(
		[pwd, confirm_pwd],
		function() {
			$(".manage_content form").submit();
		}
	)
}));