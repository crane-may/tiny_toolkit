SYNC_NOTICE.setup_with(View.Notice);
__tweet.set("reader_follow_status",__follow_status)
__tweet.setup_with(View.TweetShow);

App.on("app_ready",function() {
App.setup_with(View.Toplink);
});

//topic
$("#description_more_btn").click(__.prevent(function() {
  if (window.last_cover_hidden) clearTimeout(window.last_cover_hidden);
  $(".aside_cover").css("left","-30%").removeClass("hidden");
  setTimeout(function() {$(".aside_cover").css("left","0");},50);
}));

$(".aside_cover_close").click(__.prevent(function() {
  $(".aside_cover").css("left","-30%");
  window.last_cover_hidden = setTimeout(function() {$(".aside_cover").addClass("hidden");window.last_cover_hidden = null},1000);
}));

$(".topic_promote").click(__.prevent(function() {
  Dialog.TopicsFeed.open();
}));