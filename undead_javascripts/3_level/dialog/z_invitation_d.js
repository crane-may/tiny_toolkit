loadit("Dialog.Invitation",function(){
Dialog.Invitation = Dialog.Talk.extend({
	template: DialogTempl["invitation"],
	height: 260,
	width: 500,
	modal_option:{
		focus: false
	},
	onShow: function() {
		this.$("#invitation_code").val(this.invitation_code).attr("readonly","readonly");
		this.input_content = this.$("#invitation_code").valid_view(Valid.Base);
		
		this.input_name_jq = this.$("#letter_name").ghost_input();
		this.input_name = this.$("#letter_name").valid_view(Valid.Base);
	},
	get_content: function() {
		return "请订阅我的隐私主题&nbsp;<strong>"+this.model.get("name")+"</strong>&nbsp;，点击下面的链接进入我的隐私主题：<br /><a href='"+this.invitation_code+"' >"+
					 this.invitation_code+"</a><br />注：此链接一次有效，进入后可以浏览并订阅此主题，如果此次进入后没有订阅此主题，下次再进入就不能看到此主题。";
	}
})
});//end of loadit