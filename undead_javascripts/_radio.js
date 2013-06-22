__.success = function() {};
__.fail = function() {};
__.error = function() {};

if (__.ie9 || __.ie10) $(".jp-interface").removeClass("ie-bgColor");

var time_all = $("#jplayer").data("mp3").match(/t=(\d+)/);
if (time_all) time_all = parseInt(time_all[1]);

if (__.is_mobile_phone()){
  $(".playing_icon").addClass("hidden");
  $(".latest_play").click(function() {
    $("#jplayer").jPlayer("play");
  }).removeClass("hidden");
};

var time_show = $(".jp-time");
$("#jplayer").jPlayer({
  solution: __.is_mobile_phone() ? "html" : "flash" ,
	ready: function (event) {
    $(this).bind($.jPlayer.event.play,function() {
      $(".playing_icon").removeClass("hidden");
      $(".latest_play").remove();
    });
    
    $(this).jPlayer("setMedia", {mp3: $("#jplayer").data("mp3")});
    
    
    if (/ibooloo\.com/.test(window.location.href)) $(this).jPlayer("play");
	},
	swfPath: window.STATIC_ROOT,
	supplied: "mp3, m4a",
	wmode: "window",
  cssSelectorAncestor: "",
  cssSelector: {},
  timeupdate: function(e) {
    var delta = (time_all || e.jPlayer.status.duration) - e.jPlayer.status.currentTime;
    if (delta < 0 || delta > 6000) delta = 0;
    
    var m = Math.floor(delta / 60);
    var s = Math.floor(delta % 60);
    
    time_show.html("-"+(m < 10 ? "0"+m : m) +":"+ (s < 10 ? "0"+s : s) );
  }
});

// setTimeout(function() {$("#jplayer").jPlayer("setMedia", {mp3: $("#jplayer").data("mp3")}).jPlayer("play");},5000);


App.without_remark_del = true;
if (window.CURRENT_USER_ID) __tweet.setup_with(View.TweetShow,{without_del:true});

$(".nav_tabs a:eq(0)").click(__.prevent(function() {
  $(".nav_tabs a:eq(0)").addClass("on");
  $(".nav_tabs a:eq(1)").removeClass("on");
  
  $(".comment_wrap").fadeOut(300,function() {
    $(".audio_info").fadeIn(300);
  })
}));

$(".nav_tabs a:eq(1)").click(__.prevent(function() {
  $(".nav_tabs a:eq(1)").addClass("on");
  $(".nav_tabs a:eq(0)").removeClass("on");
  
  $(".audio_info").fadeOut(300,function() {
    $(".comment_wrap").fadeIn(300);
  })
}));

$(".aside_cover_open").click(__.prevent(function() {
  if (window.last_cover_hidden) clearTimeout(window.last_cover_hidden);
  $(".aside_cover").css("left","-30%").removeClass("hidden").addClass("v_hidden");
  setTimeout(function() {$(".aside_cover").css("left","0");},50);

  $(".chls_full").removeClass("hidden").addClass("h_hidden");
  $(".chls_abs").addClass("v_hidden");
  
  $(".chls").addClass("hidden");
  $("."+$(this).data("tab")).removeClass("hidden");
}));

$(".aside_cover_close, .aside_cover_close2").click(__.prevent(function() {
  $(".aside_cover").css("left","-30%");
  window.last_cover_hidden = setTimeout(function() {$(".aside_cover").removeClass("v_hidden").addClass("hidden");window.last_cover_hidden = null},1000);

  $(".chls_full").removeClass("h_hidden").addClass("hidden");
  $(".chls_abs").removeClass("v_hidden");
}));

$(".share_box").append(Widget.ShareLineDirect({
  url: /\/\d+$/.test(window.location.href) ? window.location.href : window.location.href + "/" + __tweet.id ,
  title: "iBooloo FM",
  summary: "分享《"+$(".jp-title").html()+"》，来自iBooloo的温暖声音，很不错。大家也去听听看吧！ @iBooloo轻日记",
  pic: $(".jp-audio img").attr("src")
}));


var report = function (src) {
  var img = new Image();
  img.onerror = img.onload = function() {};
	img.src = src;
};

if (/ibooloo\.com/.test(window.location.href)) {
  setTimeout(function() {
    report("http://tools.ibooloo.com/feedbacks/new_page_error?content=radio_30_"+window.CURRENT_USER_ID);
  },1000*30);

  setTimeout(function() {
    report("http://tools.ibooloo.com/feedbacks/new_page_error?content=radio_over_"+window.CURRENT_USER_ID);
  },1000*(time_all || 600));
}
