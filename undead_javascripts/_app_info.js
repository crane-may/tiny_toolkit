App.on("app_ready",function() {
	$("#android_apply").click(__.prevent(function() {
		Dialog.CommonPromptBig.open(null,{
			title: "申请内测",
			default_value: "",
			valid: "email",
			callback: function(s) {
				$.fetch({
					type: "POST",
					url: "/feedbacks/create_xhr",
					data: "content=我想要android啊啊啊啊啊 "+encodeURIComponent(s.val().trim())+"&feedback_type=2",
					success : function(result){
						__.success("申请成功，请等候邮件");
						$.modal.close();
					}
				});
			}
		})
	}));
});
