loadit("Dialog.Unblack",function(){
Dialog.Unblack = Dialog.Base.extend({
	template: DialogTempl["unblack"],
	height:195,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {},
	on_yes: function() {
		$.fetch({
  		url:"/users/unblock/"+this.user_id,
			type:"POST",
  		success:function(){
  			$.modal.close();
  			__.success("操作成功");
  			App.refresh();
  		}
  	});
	}
})
});//end of loadit