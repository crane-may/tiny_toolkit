loadit("!util",function(){
if (!''.trim){
  String.prototype.trim = function (){
    return this.replace(/(^\s*)|(\s*$)/g, '');
  };
}

String.prototype.eng2len=function(){
  return this.replace(/[^\x00-\xff]/g,"**").length;
};

String.prototype.ntop = function (n,end){
	n = n || 20;
	end = end || '...';
	if (this.length > n)
		return (this.substr(0, n)+end).replace(/&[nlg]?[bt]?s?p?[.][.][.]$/g,"...");
	else
		return this;
};

String.prototype.is_html_blank = function(){
  return this.replace(/<\/?(span|br|p|div)\s*\/?>/gi,"").replace(/&nbsp;/gi,"").trim() === "";
};


String.prototype.channel_name = function() {
	return this.replace(/ /gi,"&nbsp;").replace(/</gi,"");
};

String.prototype.space2nbsp = function() {
	return this.replace(/ /gi,"&nbsp;");
};


String.prototype.add_http = function(){
  if (! this.match(/^http:\/\//) ){
		return "http://" + this;
	}else{
		return this;
	}
};

String.prototype.plain_html = function(){
  return  this.replace(/</g, "&lt;") 
              .replace(/>/g, "&gt;") 
              .replace(/\ /g,"&nbsp;")
              .replace(/\n/g,"<br>")
              .replace(/\r/g,"")
              .replace(/\t/g,"&nbsp;&nbsp;");
};

String.prototype.date = function() {
	return this.replace(/-/gi,".");
};
String.prototype.date_date = function() {
	return this.split(/ /)[0].replace(/-/gi,".");
};
String.prototype.date_time = function() {
	return this.split(/ /)[1];
};
String.prototype.date_without_second = function() {
	return this.replace(/-/gi,".").substring(0,16);
};
String.prototype.size_level = function() {
  var n = this.length;
  if (n < 4) return 1;
  else return 2;
};

(function(){
  var root = this;
  var $_ = root.$_ = {};
  
  $_.static_url = function(s){
    return window.STATIC_ROOT+s;
  };
  
  $_.csrf_token = function(){
    return $('meta[name="csrf-token"]').attr('content') || "";
  };
  
	// S	30
	// N	50
	// NN	120
	// L	175
	// XL	460
	
  var sizes = {
    S1 : 40,
    S2 : 60,
    L1 : 145,
    L2 : 160,
    L3 : 200,
    X1 : 560,
    X2 : 960
  };
  $_.image = function(id,size){
    if (! sizes[size]) throw "error size";
    return window.IMG_ROOT +id+"-"+size;
  };
  
  $_.face = $_.image;
  
}).call(this);

(function(){
	var root = this;
	var __ = root.__ = {};
	
	__.event = function (e){
		if (e.srcElement){
			return e.srcElement;
		}else{
			return e.target;
		}
	};
	
	__.prevent = function(func,not_document_click) {
		var __method = func;
		return function(event) {
			var need_prevent = !! (event && __.event(event) && $(__.event(event)).is("a") );
			if (need_prevent && event.preventDefault) event.preventDefault();

			__method.call(this, event);
			
			if (need_prevent)	{
				if (! not_document_click) App.trigger("document_click",event);
				return false;
			}
		};
	};

	__.is_mobile_phone = _.memoize(function(not_include_pad){
    var sUserAgent = navigator.userAgent.toLowerCase();  
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";    
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";  
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";  
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";  
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";  
    var bIsAndroid = sUserAgent.match(/android/i) == "android";  
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";  
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile"; 
    
    if((bIsIpad && !not_include_pad)||bIsIphoneOs||bIsAndroid||bIsMidp||bIsUc7||bIsUc||bIsCE||bIsWM){  
        return true;
    } else{
      return false;
    }
	});

  __.sogou = /MetaSr/.test(window.navigator.userAgent);
  
  if (__.sogou) {
    if ($.browser.msie && document.documentMode == 10)      __.ie10 = true; 
    else if ($.browser.msie && document.documentMode == 9)  __.ie9 = true;
    else if ($.browser.msie && window.postMessage)          __.ie8 = true;
    else if ($.browser.msie && window.XMLHttpRequest)       __.ie7 = true;
    else if ($.browser.msie && document.compatMode)         __.ie6 = true;
  }else{
    __.ie6 = $.browser.msie && ($.browser.version == "6.0");
    __.ie7 = $.browser.msie && ($.browser.version == "7.0");
    __.ie8 = $.browser.msie && ($.browser.version == "8.0");
    __.ie9 = $.browser.msie && ($.browser.version == "9.0");
    __.ie10= $.browser.msie && ($.browser.version == "10.0");    
  }
  
  __.chs_error = function(ret,default_err){
    var chs_err = null;
    _(_(ret).flatten()).each(function(err){
       if (/^::/.test(err))
         chs_err = chs_err || err;
    });

    return _.isNull(chs_err) ? (default_err ? default_err : "") : chs_err;
  };
	
	var stack_topright = {"dir1" : "down", "dir2" : "right", "push" : "top"};
	__.success = function(text){
		__.unlock("manage");
		$.notifyBar({ cls: "success", html: text});
	};
	__.fail = function(text){
		__.unlock("dialog_yes");
		__.unlock("manage");
		$.notifyBar({ cls: "error", html: text.replace(/::/g,"")});
	};
	__.fail_continue = function(text) {
		if ($("#__notifyBar").length == 0) __.fail(text);
	};
	__.error = function(text){
    __.fail(text); 
	};
	__.error_long = function(text){
		$.notifyBar({ cls: "error", html: text.replace(/::/g,"") ,delay: 10000 });
	};
	__.info = function(text){
    $.notifyBar({ cls: "error", html: text, close: true, delay: 100000});
	};
	
	__.validate_email_lite = function(email) { 
    var re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //var re = /^\w[^<>,;:\s@\"]+@([^<>,;:\s@\"]+)(\.[^<>,;:\s@\"]+)+$/;
    return email.match(re);
	};
	
	__.preload_image = function(url,callback) {
		var img = new Image();   
    img.onload = function () { 
        callback.call(img);
    };
    img.src = url;
	};
	
	__.set_content_min_height = function(selector_,selector_blank_,height_func_){
		var selector = selector_;
		var selector_blank = selector_blank_;
		var height_func = height_func_;
		
		var cal_min_height = function() {
			var delta = height_func() - selector.height() + selector_blank.height();
			selector_blank.css("height",(delta > 0? delta +5 : 5)+"px").removeClass("hidden");
		};
		
		var cal_height = function() {
			selector.css("min-height",( height_func() +5)+"px");
		};
		
		if ($.browser.msie && ($.browser.version == "6.0" ||$.browser.version == "7.0" ) ){
			cal_min_height();
			setInterval(cal_min_height,1000);
		}else{
			cal_height();
			setInterval(cal_height,2000);
		}
	};
	
	var lock_store = {};
	__.lock = function(op_) {
		var op = op_;
		lock_store[op.lock] = false;
		var locked_handler = function() {
			if (! lock_store[op.lock]){
				var self = this;
				lock_store[op.lock] = function() {
					if (op.unlock) op.unlock.call(self);
				};
				
				op.handler.call(this,arguments);
			}	else {
				if (op.locking) op.locking.call(this);
			}
		};
		
		return locked_handler;
	};
	
	__.unlock = function(s) {
		if (lock_store[s] &&_.isFunction(lock_store[s])) lock_store[s]();
		lock_store[s] = false;
	};
	
	__.empty_default = function(tar,empty) {
		if (! tar) return empty;
		else if (! tar.length) return empty;
		else return tar;
	};
	
	__.scrollTop = function(val) {
		if (_.isUndefined(val)){
			return document.documentElement.scrollTop  
                || document.body.scrollTop  
                || 0;
		}else{
			if (document.body) document.body.scrollTop = val;
			if (document.documentElement) document.documentElement.scrollTop = val;
		}
	}
	
	__.clientHeight = function() {
		return document.documentElement.clientHeight;
	}
	
	__.clientWidth = function() {
		return document.documentElement.clientWidth;
	}
	
	__.getMousePos = function (event) {
    var e = event || window.event;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var y = e.pageY || e.clientY + scrollY;
    // alert('y: ' + y);
    return y;
  }
  
  __.report = function (cnt) {
    if (/ibooloo\.com/.test(window.location.href)) {
      var img = new Image();
      img.onerror = img.onload = function() {};
    	img.src = "http://tools.ibooloo.com/feedbacks/new_page_error?content="+cnt;
    }
  };
	
//do search
$("#head_search_btn").click(__.prevent(function() {
	if($("#head_search_input").val()==$("#head_search_input").attr("title"))
		return;
	$("#search_form").submit();
}));

//Dialog init
var dialogs = ["Retweet","AddTags","Black","CommonConfirm","CommonNotice","CommonPrompt","CreateChannel","DelChannel","Follow","ForgetPassword","InputAt","InputLink",
"InputMusic","InputPic","InputVideo","Login","Preview","PrivateChannel","PublicChannel","RenameChannel","ResortChannel","Talk","Unblack","Invitation" ];
window.Dialog = {};

var dialog_listener = null;

var close_init_layer = function() {
	$("#wait_for_dialog").addClass("hidden");
	$(document).unbind("click",close_init_layer);
};

var init_layer = function(cls_) {
  var fun = function(a_,b_,c_) {
    $("#wait_for_dialog").removeClass("hidden");
    _.delay(function(){$(document).bind("click",close_init_layer);},200);
    var cls = cls_,
        a = a_,
        b = b_,
        c = c_;
    
    dialog_listener = function() {
      Dialog[cls_].open(a,b,c);
    };
  };
  
  return fun;
};

App.on("app_complete",function() {
	if (dialog_listener && ! $("#wait_for_dialog").hasClass("hidden")){
		close_init_layer();
		dialog_listener();
	}
});

_(dialogs).each(function(i) {
	window.Dialog[i] = {
		open: init_layer(i)
	};
});

//document click
$(document).click(function(event) {
	App.trigger("document_click",event);
});

window.listen_ueditor_iframe_click = function(){
  App.trigger("document_click");
};

}).call(this);
});//end of loadit