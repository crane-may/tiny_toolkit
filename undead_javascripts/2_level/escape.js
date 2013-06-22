loadit("!escape",function(){
var _$ = this._$ = {};

var cccode_parser=[
	[
		/<a /gi,
		'<a target="_blank" '
	],
	[
		/ (class|id)=(["']?[^d]^[e][^'" ]*["']?)/gi,
		" $1&nbsp;&#61;$2"
	],
	[
		/background-color:|background-image:|font-style:italic|position:absolute/gi,
		function(s){return s.replace(/:/,"&nbsp;:")}
	],
	[
	  /userpage[?]name=/gi,
	  "userpage/0?name="
	],
	[
    /@([a-z0-9A-Z\u1e00-\uffa5~_.-]+)(?!<\/a>|[a-z0-9A-Z\u1e00-\uffa5~_.-])/gi,
    // /@([a-z0-9A-Z\u4e00-\u9fa5~_.-]+)(?!<\/a>|[a-z0-9A-Z\u4e00-\u9fa5~_.-])/gi,
	   // '$1<a href="/userpage/0?name=$2">@$2</a> '
		function(s){
			if (/\.com|\.net|\.org|\.cn/.test(s)) {
				return s;
			}
			var name = s.match(/@([a-z0-9A-Z\u1e00-\uffa5~_-]+)/);
			if (name && name.length > 1){
				return s.replace(/@([a-z0-9A-Z\u1e00-\uffa5~_-]+)/,'<a target="_blank" href="/userpage/0?name='+encodeURIComponent(name[1])+'">@'+name[1]+'</a> ')
			}else{
				return s;
			}
		}
	],
	[
	  /<img[^>]*?src="[^"]*?\/get\/([0-9a-f]+)[.-]L3?"[^>]*?ex_image="true"[^>]*?>/gi,
	  "<div class='img_frame clearfix'><img class=\"img_content\" src=\""+ $_.image("$1","L3") +"\" /><a class='fullscreen' title='全屏查看' href='javascript:void(0);'></a></div>"
	],
	[
	  /<img[^>]*?ex_image="true"[^>]*?src="[^"]*?\/get\/([0-9a-f]+)[.-]L3?"[^>]*?>/gi,
	  "<div class='img_frame clearfix'><img class=\"img_content\" src=\""+ $_.image("$1","L3") +"\" /><a class='fullscreen' title='全屏查看' href='javascript:void(0);'></a></div>"
	],
	[
	  /<img[^>]*?ex_video="::([^"]*?)"[^>]*?>/gi,
	  '<div class="video_thumb" data-swf="$1"> \
	    <img src="'+$_.static_url('/images/videoplay.gif')+'" class="videoplay_btn"/> \
	  </div> \
	  <div class=\"video_frame hidden\"></div> \
	  <div class="video_operation hidden"> \
	    <a >收起视频</a> \
	  </div>'
	],
	[
	  /<img[^>]*?ex_video="([^"]+?)::([^"]*?)"[^>]*?>/gi,
	  '<div class="video_thumb" style="background-image:url($1)" data-swf="$2"> \
	    <img src="'+$_.static_url('/images/videoplay.gif')+'" class="videoplay_btn"/> \
	  </div> \
	  <div class=\"video_frame hidden\"></div> \
	  <div class="video_operation hidden"> \
	    <a >收起视频</a> \
	  </div>'
	],
	[
	  /<img[^>]*?ex_xiami="([^"]*?)"[^>]*?>/gi,
	  '<p><embed src="$1" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent"></embed></p>'
	],
	[
	  /<img[^>]*?ex_mp3="([^"]*?)"[^>]*?>/gi,
		function(){
			if ($.browser.msie)
				return '<p><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="290" height="24"><param name="movie" value="'+$_.static_url('/player.swf')+'" /><param name="wmode" value="opaque"><param name="menu" value="false"><param name="flashvars" value="soundFile=$1"></object></p>';
			else
				return '<p><object type="application/x-shockwave-flash" style="outline: none" data="'+$_.static_url('/player.swf')+'" width="290" height="24" ><param name="wmode" value="opaque"><param name="menu" value="false"><param name="flashvars" value="soundFile=$1"></object></p>';
		}()
	],
	[
	  /<\s*\/?\s*script/gi,
	  '&lt;script'
	]
];

_$.cccode_html = function(str){
  for(var i=0;i<cccode_parser.length;i++){
		var re = cccode_parser[i][0];
    
		if (re instanceof RegExp){
			str = str.replace(re,cccode_parser[i][1]);
		}
  }
  
  return str;
}

var cccode_content_parser=[
  [
    /<img[^>]*?ex_image="true".*?\/?>/gi,
    "{图片}"
  ],
  [
    /<img[^>]*?ex_video="(.*?)::(.*?)"[^><]?\/?>/gi,
    '{视频}'
  ],
  [
    /<img[^>]*?ex_xiami="(.*?)"[^><]?\/?>/gi,
    '{音乐}'
  ],
  [
    /<img[^>]*?ex_mp3="(.*?)"[^><]?\/?>/gi,
    '{音乐}'
  ],
  [
    /<[^>]*?>/gi,
    ' '
  ]
];

_$.cccode_txt = function(str){
  for(var i=0;i<cccode_content_parser.length;i++){
		var re = cccode_content_parser[i][0];
    
		if (re instanceof RegExp){
			str = str.replace(re,cccode_content_parser[i][1]);
		}
  }
  
  return str;
}

var cccode_letter_parser=[
  [
    /<(?!a|br|strong|\/a|\/strong)[^><]*?>/gi,
    ''
  ],
	[
    /\n\r|\r\n|\n|\r/gi,
    '<br />'
  ]
  //   ,[
  //  /\[(smile-\d+)\]/gi,
  //  '<img src="/$1.gif" />'
  // ]
];

_$.letter_html = function(str){
  for(var i=0;i<cccode_letter_parser.length;i++){
		var re = cccode_letter_parser[i][0];
    
		if (re instanceof RegExp){
			str = str.replace(re,cccode_letter_parser[i][1]);
		}
  }
  
  return str;
}

_$.letter_plain = function(text){
    return text.replace(/<[^>]*?>/gi, "") 
    		   .replace(/\s/g,"&nbsp;")
}


_$.plain_html = function(text){
  return text.replace(/</g, "&lt;") 
  					 .replace(/>/g, "&gt;") 
  					 .replace(/\ /g,"&nbsp;")
  					 .replace(/\n/g,"<br>")
					 .replace(/\r/g,"")
  					 .replace(/\t/g,"&nbsp;&nbsp;");
}

var topic_content_parser=[
  [
    /<[^>]*?>/gi,
    ' '
  ],
  [/[&]nbsp;|\u2028|　/g," "]
];

_$.topic_txt = function(str){
  for(var i=0;i<topic_content_parser.length;i++){
		var re = topic_content_parser[i][0];
    
		if (re instanceof RegExp){
			str = str.replace(re,topic_content_parser[i][1]);
		}
  }
  
  return str.ntop(200);
}

_$.topic_img = function(str) {
  if (/<img[^>]*?ex_image="true".*?\/?>/.test(str)) {
    var ma = str.match(/<img[^>]*?src="[^"]*?\/get\/([0-9a-f]+)[.-]L3?"[^>]*?>/);
    if (ma) {
      return "<img src=\""+ $_.image(ma[1],"L3") +"\" />";
    }
  }
  
  return "";
}

_$.topic_video_thumb = function(str) {
  if (/<img[^>]*?ex_video="([^"]*?)::([^"]*?)"[^>]*?>/.test(str)) {
    var ma = str.match(/<img[^>]*?ex_video="([^"]*?)::([^"]*?)"[^>]*?>/);
    if (ma) {
      return "display: block;background-image:url("+ma[1]+")";
    }
  }
  
  return "";
}

_$.topic_xiami = function(str) {
  if (/<img[^>]*?ex_xiami="([^"]*?)"[^>]*?>/.test(str)) {
    var ma = str.match(/<img[^>]*?ex_xiami="([^"]*?)"[^>]*?>/);
    if (ma) {
      return '<p><embed src="'+ma[1]+'" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent"></embed></p>';
    }
  }
  
  return "";
}


window.cannot_resize_img = function(event){
  if (event.preventDefault) event.preventDefault();
  event.returnValue = false;
}
});//end of loadit