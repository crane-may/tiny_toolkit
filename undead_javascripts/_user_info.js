SYNC_NOTICE.setup_with(View.Notice);

__user.setup_at(View.Tag,$(".tags_wrapper"))

function error_map (ret) {
	var err = __.chs_error(ret);
	if (err.trim() == ""){
		if (ret["name"]){
			return "用户名支持7个以内的中文或14以内的英文（数字）";
		}
		if (ret["email"]){
			return "请填写正确的邮箱,长度应该在6～40个字符";
		}
		if (ret["intro"]){
			return "个人介绍在140个字之内";
		}
	}else{
		return err;
	}
}

var input_name = $("#name").valid_view(Valid.Base);
var input_email = $("#email").valid_view(Valid.Base);
var input_intro = $("#intro").valid_view(Valid.Base);

var save_btn = $("#edit_user_info");
var lock = __.lock({
	handler: function() {
		save_btn.loading_mask();
	},
	lock:"manage",
	unlock: function() {
		save_btn.loading_mask_recover();
	}
})

save_btn.click(__.prevent(function() {
	lock();
	ValidCenter(
		[input_name,input_email,input_intro],
		function() {
			$.fetch({
				type: "POST",
				url: "/users/update",
				data: $('#form_update_info').serialize(),
				success : function(result){
					__.success("更新成功！");
				},
				error_417 : function(ret){
					__.fail(error_map(ret));
				}
			});
		}
	)
}));

App.on("app_complete",function(){
  $('#intro').maxlength({
    maxCharacters: 140, 
    statusText: "<p class='cGray2 f12px lh20'>还可以写 <span class='f16px fI cOrange'>%%</span> 个字</p>"
  });
});