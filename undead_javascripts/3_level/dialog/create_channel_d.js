loadit("Dialog.CreateChannel",function(){
window.Dialog.CreateChannel = Dialog.Base.extend({
	template: DialogTempl['create_channel'],
	height:305,
	events: {
		"click .for_new_public_cnl":"on_public",
		"click .for_new_private_cnl":"on_private",
		"click .yes": "on_yes"
	},
	onShow: function() {
		this.name = this.$("#cnl_name").valid_view(Valid.Base);
		$("#new_public_cnl").attr('checked',true);
		$("#new_private_cnl").attr('checked',false);
	},
	on_public: function() {
		this.$('#new_public_cnl').attr('checked',true);
	},
	on_private: function() {
		this.$('#new_private_cnl').attr('checked',true);
	},
	on_yes: function() {
		ValidCenter(
			this.name,
			function() {
				var data = {
					name: this.name.val(),
					level: $("#new_private_cnl").attr('checked') ? 1 : 0
				}
				try{
					if (App.views["InputHome"] && App.views["InputHome"].editor && ! App.views["InputHome"].editor.is_empty()){
						data.draft = App.views["InputHome"].editor.raw_val();
					}
				}catch(e){}
				
				$.fetch({
					type: "POST",
					url: "/channels/create" ,
					data: $.param(data),
					success: function() {
						__.success("创建成功！");
						$.modal.close();
						App.refresh();
					}
				});
			}
		,this);
	}
})
});//end of loadit