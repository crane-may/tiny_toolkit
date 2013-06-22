SYNC_NOTICE.setup_with(View.Notice);

var send_btn = $("#invitation_btn");
var lock = __.lock({
	handler: function() {
		send_btn.loading_mask();
	},
	lock:"manage",
	unlock: function() {
		send_btn.loading_mask_recover();
	}
});

send_btn.click(__.prevent(function(){
	lock();
	var emails = $("#email_target").val().trim().split(/[，,]/);
	
	var ems = [];
	var error = false;
	
	_(emails).each(function(em){
		em = em.trim();
		if (em != ""){
			if (! ValidOption.email.regex.test(em)){
				error = true;
			}else{
				ems.push(em);
			}
		}
	});
	
	if (error || ems.length == 0){
		__.error("邮件地址格式错误");
		return;
	}
	
	if (ems.length > 5){
		__.error("不能超过5个邮件地址");
		return;
	}
	
	$.fetch({
		url:"/users/send_invitation",
		type: "POST",
		data: "email="+encodeURIComponent(ems.join(',')),
		success:function(){
			__.success("邀请邮件已发送");
			$("#email_target").val("");
		}
	})
}));

App.on("app_complete",function(){
	if (! __.is_mobile_phone()){
		var clip = ZeroClipboard.setMoviePath( $_.static_url('ZeroClipboard.swf') );
		var clip = new ZeroClipboard.Client();
		clip.setText( $("#copy_target").val() );
		clip.glue( 'copy_btn' );
		clip.addEventListener( 'onComplete', function(){
			__.success("已经复制到剪贴板");
		} );
	}else{
		$("#copy_btn").click(function(){
			alert("自动复制暂不支持手机，请手动复制");
		});
	}
})