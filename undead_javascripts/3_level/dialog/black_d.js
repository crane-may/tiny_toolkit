loadit("Dialog.Black",function(){
Dialog.Black = Dialog.Base.extend({
	template: DialogTempl["black"],
	height:195,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {},
	on_yes: function() {
		$.fetch({
  		url:"/users/block/"+this.user_id,
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