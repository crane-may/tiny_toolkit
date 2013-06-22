if (! window.console){
	window.console = {
		log: function() {},
		debug: function() {}
	};
}

window.CATCH_ERROR = ! /^[0-9.:]+$/.test(window.location.host);

function proc_error (e,s1,s2,s3) {
	var s = "";
	if (s1) s+=s1+"-";
	if (s2) s+=s2+"-";
	if (s3) s+=s3+"-";
	if (e){
		s+=e+"+";
		if (typeof e != "string")
			for (var i in e){	s += i+":"+e[i]+"-"; }		
	}
  // raise e;
	send_crash(trace_store+"|"+s);
}

var trace_store = "";
function tracecert (s) {
	trace_store += "|" + s;
}

function loadit (sig, func_body) {
	// console.debug("load "+sig);
	tracecert("ld "+sig);
	window.loading_scope = sig;
	
	if (window.CATCH_ERROR) {
		try{
			func_body.call(window);
		}catch(e){
			proc_error(e,"load "+sig);
		}
	}else{
		func_body.call(window);
	}
}

function send_crash(s){
	var jx_load = function (url) {
		var img = new Image();
		img.src = url;
	};
	if (s.length > 200) s = "..."+s.substring(s.length - 200);
	jx_load("http://tools.ibooloo.com/feedbacks/new_page_error?content=" + encodeURIComponent(s) );
	window.send_crash = function(s) {};
}

window.send_crash_org = send_crash;

if (window.CATCH_ERROR && ! /Safari\/535\.1.*MetaSr/.test(navigator.userAgent)){
  window.onerror = function(message, url, linenumber) {
    try{
      proc_error(null,message, url, linenumber);  
    }catch(e){}
    return true;
  };  
}