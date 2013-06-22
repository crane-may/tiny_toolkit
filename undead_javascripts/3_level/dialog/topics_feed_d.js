loadit("Dialog.TopicsFeed",function(){
Dialog.TopicsFeed = Dialog.Base.extend({
	template: DialogTempl["topics_feed"],
	height:190,
	width: 400,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
	},
	on_yes: function() {
		ValidCenter(
			[function() {
        var feed = $("#feed_input").val().trim();
        var ms = null;
        ms = feed.match(/\/(m|messages\/show)\/(\d+)/);
        if (ms) {
          this.feed = ms[2];
          return true;
        }
        
        ms = feed.match(/^\d+$/);
        if (ms) {
          this.feed = ms[0];
          return true;
        }
        
        __.error("日记链接地址错误");
				return false;
			}],
			function() {
				$.fetch({
		  		type:"POST",
		  		url:"/topics/feed/"+__topic_id,
		  		data: "mid="+this.feed,
		  		success:function(result){
		  			$.modal.close();
            App.trigger("reload");
		  			__.success("投稿成功");
		  		}
		  	});
			}
		,this);		
	}
})
});//end of loadit