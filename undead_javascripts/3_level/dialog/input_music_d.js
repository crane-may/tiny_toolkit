loadit("Dialog.Input-music",function(){
Dialog.InputMusic = Dialog.Base.extend({
	template: DialogTempl["input_music"],
	height:220,
	modal_option:{
		focus: false
	},
	events:{
		"click #insert_xiami .yes":"on_xiami",
		"click #insert_mp3 .yes":"on_mp3"
	},
	onShow: function() {
		this.input_xiami_jq = this.$("#insert_xiami input").ghost_input();
		this.input_mp3_jq = this.$("#insert_mp3 input").ghost_input();
		this.$(".follow_menu li a").switch_bind(this.$(".dialog_content"),"on");
	},
	on_xiami: function() {
		var url = this.input_xiami_jq.val().trim().add_http();
		
	  if (! /^http:\/\/www\.xiami\.com\/widget\/\w+_\w+\/singlePlayer\.swf$/.test(url) ){
	  	__.fail("输入链接错误，请输入有效的虾米音乐.swf格式链接");
			return;
	  }
		
		if(this.callback){
			this.callback(' <img src="'+$_.static_url('/images/audio.gif')+'" ex_xiami="'+encodeURI(url)+'" /> <br > ');
			$.modal.close();
		}
	},
	on_mp3: function() {
		var url = this.input_mp3_jq.ghost_input_val().trim().add_http();
		
	  if (! /.mp3/.test(url)){
	    __.fail("输入链接错误，请输入有效的.mp3格式链接");
			return;
	  }
		
		if(this.callback){
			this.callback(' <img src="'+$_.static_url('/images/audio.gif')+'" ex_mp3="'+encodeURIComponent(url)+'" /> <br > ');
			$.modal.close();
		}
	}
})
});//end of loadit