if ($("#domain_input").length > 0) {
	var domain_name = $("#domain_input").valid_view(Valid.Underline,{
		dis_error_span: this.$(".error_tip")
	});

	__.error = __.fail = function(s) {
		__.unlock("manage");
		domain_name.dis_error(s);
	};

	var save_btn = $("#edit_user_info");
	var lock = __.lock({
		handler: function() {
			save_btn.loading_mask();
			ValidCenter({
				valid: domain_name,
				callback: function() {
					$.fetch({
						url:"/users/create_domain_name",
						type: "POST",
						data: "domain_name="+encodeURIComponent(domain_name.val()),
						success:function(){
							__.success("个性域名创建成功");
							App.refresh();
						}
					})
				},
				lock: "manage"
			})
		},
		lock:"manage",
		unlock: function() {
			save_btn.loading_mask_recover();
		}
	})

	save_btn.click(__.prevent(function() {
		lock();
	}));
}