SYNC_NOTICE.setup_with(View.Notice);$.scrollTo(0,0);

__channels.setup_with(View.Tongues);
__channels.setup_with(View.InputHome,{shortcut: __shortcut});

__channels.each(function(chl){
	chl.timeline("mix").setup_with(View.Timeline);
	chl.setup_with(View.ChannelInfo);
});

App.trigger("goto_channel",__channels.at(0).id);

App.on("create_tweet",function() {
	App.trigger("goto_channel",__channels.at(0).id);
});

App.on("app_complete",function() {
	App.on("change:current_channel_id",function() {
		App.delay_trigger(10,"reset_tip");
	});
  
  if (window.__random && !(__.is_mobile_phone() || __.ie6)){
    setTimeout(function() {
      $(".random_pick_topic").fadeIn();
    },1000);
    setTimeout(function() {
      var remove_random = function() {
        $(".random_pick_topic").fadeOut(400,function() {
          $(".random_pick_topic").remove();
        });
        App.off("draft_save",remove_random);
      };
      App.on("draft_save",remove_random);
    },4000);
  }
})

App.setup_with(View.Toplink);

var leftbox = $("#leftbox");
__.set_content_min_height($("#content"),$("#content_blank"),function() {
	return Math.max( leftbox.outerHeight(true) ,600 );
});


function test_speed(src,callback){
	var start = (new Date).getTime();
	
	var jx_load = function (src,callback_) {
		var callback = callback_;
		var img = new Image();
		
		img.onerror = img.onload = function() {
			callback_((new Date).getTime() - start);
		};
		img.src = src;
	};
	
	jx_load(src , callback);
}

// if (Math.random() > 0.7){
// 	setTimeout(function(){
//     var t1 = window.TS_LOADED_2_LEVLE ? (window.TS_LOADED_2_LEVLE - window.TS_START_DOCUMENT) : 100*1000;
//     var t2 = window.TS_TWEETS_COMPLETE ? (window.TS_TWEETS_COMPLETE - window.TS_START_DOCUMENT) : 100*1000;
//     var t3 = window.TS_EDITOR_LOADED ? (window.TS_EDITOR_LOADED - window.TS_START_DOCUMENT) : 100*1000;
//     
//     test_speed("http://alpha.ibooloo.com:8079/ap?name=LEVEL2_loadtime,TWEETS_overtime,EDITOR_loadtime&v="+t1+","+t2+","+t3,function() {});
// 	},20*1000);
// }

window.TS_LOADED_2_LEVLE = $.now();

$(".random_pick_topic").click(__.prevent(function() {
  Dialog.Random.open();
}));