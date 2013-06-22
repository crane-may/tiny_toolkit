loadit("Dialog.Input-video",function(){
Dialog.InputVideo = Dialog.Base.extend({
	template: DialogTempl["input_video"],
	height:240,
	modal_option:{
		focus: false
	},
	events:{
		"click .yes":"on_yes"
	},
	video_match_list : {
		youku:/http:\/\/player\.youku\.com\//,
		tudou_p:/http:\/\/www\.tudou\.com\/programs\/view\//,
		tudou:/http:\/\/www\.tudou\.com\//,
		ku6:/http:\/\/player\.ku6\.com\//,
		56:/http:\/\/player\.56\.com\//,
		sina:/http:\/\/you\.video\.sina\.com\.cn\//,
		youku_v:/http:\/\/v\.youku\.com\/v_show\/id_/,
		ku6_s:/http:\/\/v\.ku6\.com\//,
		"56_u":/http:\/\/www.56.com\//,
		yinyuetai_v:/http:\/\/(www|player).yinyuetai.com\/video/
	},
	video_id_list : {
		youku:/\/sid\/([^.\/]+)/,
		tudou_p:/view\/([^.\/]+)/,
		tudou:/\/v\/([^.\/]+)/, //not support list like http://www.tudou.com/l/G-uTRUKeYW4/&iid=61566303/v.swf
		ku6:/\/refer\/([^.\/]+)/,
		56:/\/v_([^.\/]+)/,
		sina:/vid=([^_]+)_([^_]+)/,
		youku_v:/id_([^._]+)\.html/,
		ku6_s:/\/([^\/.]+)\.html/,
		"56_u":/v_([^\/._]+).html/,
		yinyuetai_v:/video[^0-9]+([0-9]+)/
	},
	video_url : {
	  youku_v : "http://player.youku.com/player.php/sid/{id}/v.swf",
	  tudou_p : "http://www.tudou.com/v/{id}/v.swf",
	  ku6_s : "http://player.ku6.com/refer/{id}/v.swf",
	  "56_u": "http://player.56.com/v_{id}.swf",
		yinyuetai_v: "http://www.yinyuetai.com/video/player/{id}/v_0.swf"
	},
	onShow: function() {
		this.input_name_jq = this.$("input").ghost_input();
	},
	on_yes: function() {
		var url = this.input_name_jq.val().trim().add_http();
		
		if (url.match(/[><]/) ){
			__.fail("不能包含html标签，请输入html地址或swf地址");
			return;
		}
		
		var match_one = false;
		_(this.video_match_list).each(function(video_match,i){
			if (url.match(video_match) && !match_one){
				match_one = true;
				var ms = url.match(this.video_id_list[i]);
				if (ms){
					var id = ms.slice(1).join("-");
					
					$.fetch({
						url:"/channels/dov/"+ encodeURIComponent(id),
						data:"t="+i,
						context:this,
						type: "GET",
						success: function(result) {
							if (i.indexOf("_") >= 0)
								url = this.video_url[i].replace("{id}",id);
							
							if(this.callback && !this.is_close){
								this.callback(' <img src="'+$_.static_url('/images/video.gif')+'" ex_video="'+encodeURI(result)+'::'+encodeURI(url)+'" />  <br /> ');
								$.modal.close();
							}
						}
					});
				}else{
					__.fail("视频链接格式错误");	
				}
			};
		},this);
		if (! match_one)	__.fail("目前只支持优酷、土豆、酷6、56、音悦台、新浪的视频链接");
	}
})
});//end of loadit