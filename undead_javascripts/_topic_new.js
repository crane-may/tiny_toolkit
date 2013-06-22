App.on("create_tweet",function(twt) {
	App.goto("/topics/home/"+__topic_id);
});
 
window.last_tip = null;

$(".topic_promote").click(__.prevent(function() {
  Dialog.TopicsFeed.open();
}));

function close_tip () {
  if (window.last_tip) clearTimeout(window.last_tip);
  
  window.last_tip = setTimeout(function() {
    window.last_tip = null;
    $(".tip_wrap span").fadeOut(500,function() {
      $(".tip_wrap span").hide();
    })
  },5000);
}

// __.success = function(s) {
//   $(".tip_wrap span").removeClass("tip_error").addClass("tip_success").html(s).show();
//   close_tip();
// }
// 
// __.error = __.fail = function(s) {
//   $(".tip_wrap span").removeClass("tip_success").addClass("tip_error").html(s).show();
//   close_tip();
//   __.unlock("dialog_yes");
// }

window.__toolbar_float = ! $.browser.msie;

//flash(
__channels.setup_with(View.InputHome,{shortcut: __shortcut, tweet_url: "/topics/tweet/"+__topic_id+"?"+(window.__lamp ? "lamp="+encodeURIComponent(__lamp)+"&" : "")+"cid=",
                                      return_tweet_at_created:true,select_title:"选择日记主题",
                                      is_topic:true,topic_id:__topic_id});
                                      
                                      