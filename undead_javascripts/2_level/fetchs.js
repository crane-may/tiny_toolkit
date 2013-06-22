loadit("!fetchs",function(){
var fetch_status = {};
var FETCH_CACHE = {};
var is_fetching = function(url){
  return !! fetch_status[url];
}

$.extend({
fetch : function(option){
  var org_url = option.url;
	
	if (option.cache && FETCH_CACHE[org_url]){
  	option.success.call(option.context,FETCH_CACHE[org_url].result,FETCH_CACHE[org_url].timestamp);
		if (option.lock) __.unlock(option.lock);
		return;
	}
	
	var pur_org_url = org_url.split("?")[0];
	if (window.__fetch_cache && __fetch_cache[pur_org_url]) {
		setTimeout(function() {
			option.success.call(option.context,__fetch_cache[pur_org_url].result,__fetch_cache[pur_org_url].timestamp);
			__fetch_cache[pur_org_url] = null;
			if (option.lock) __.unlock(option.lock);
		},100);
		return;
	}
	
  if (is_fetching(org_url)){
    // noti_error("上一个操作正在进行中，请稍后或刷新页面重新发送");
		if (option.lock) __.unlock(option.lock);
	  return;
  }
  fetch_status[org_url] = true;
  
  if (option.url.indexOf('?') < 0) 
			option.url += '?ts='+ $.now();
	else
			option.url += "&ts=" + $.now();
	
	if (! option.type) throw "$.fetch must have type";
	
  $.ajax({
		type: option.type,
		url: option.url,
		data: option.data,
		dataType: 'json',
		contentType: (option.data && option.data.length > 0 && /[{\[]/.test(option.data.charAt(0)) ) ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded',
		
		beforeSend:function(jqXHR,settings){
		  jqXHR.setRequestHeader('X-CSRF-Token', $_.csrf_token() );
		},
		
		success : function(result){
		  fetch_status[org_url] = false;
			if (option.lock) __.unlock(option.lock);
			
			if (option.cache)
				FETCH_CACHE[org_url] = result;
		  
			if(!result) return;
			
			if(result){
				if (option.success)
			  	option.success.call(option.context,result.result,result.timestamp);
			}else{
				if (!option.noti)
				  __.fail(option.fail || "操作好像没有成功，再试一次吧！");
			}
		},
		error : function (a,b,c){
		  fetch_status[org_url] = false;
			if (option.lock) __.unlock(option.lock);
		  
			if (option.error_before) option.error_before(a.status);
			
		  if (a){
		    if (a.status == 417 && (a.response || a.responseText)){
					var response = a.response || a.responseText;
		      var err = eval("["+response+"]")[0];
		      
		      if (!option.error_417){
  		      if (option.fail_callback){
  		        option.fail_callback(err);
  		      }
  		      else if (!option.noti){
  		        var chs_err = __.chs_error(err);
  		        __.fail(
  		          (
  		             chs_err != ""  ?
  		             chs_err :
  		             null
		             )
  		           || option.fail 
  		           || "操作好像没有成功，再试一次吧！");
  		      }
		      }else{
		        option.error_417.call(option.context,err);
		      }
		    }else if (a.status == 401){
					__.fail("您已经退出ibooloo，请刷新页面重新登陆");
				}else if (!option.noti){
		      __.fail(option.fail || "操作好像没有成功，再试一次吧！");
		    }
		  }else	if (!option.noti){
			 	 __.fail(option.fail || "操作好像没有成功，再试一次吧！");
			}
		}
	});
}
});

function get_iframe_result(iframe_id,callbck,error_func,context){
  try{
    var result = document.getElementById(iframe_id).contentWindow["result"];
		if (result == "1"){
			error_func.call(context,"图片上传失败,请检查图片的大小");
      return;
    }else if (result == "2"){
			error_func.call(context,"上传的图片格式错误，请上传常用格式图片文件");
      return;	
    }else if (result === "0"){
			error_func.call(context,"上传的图片格式错误，请上传常用格式的图片文件");
      return;			
		}else if (result === undefined){
			error_func.call(context,"图片上传失败,请检查图片大小");
      return;
		}else{
			callbck.call(context,result);
		}
  }catch(e){
    error_func.call(context,"上传图片格式错误，请上传常用格式的图片文件");
  }
}

$.fn.submit_with_iframe = function(action,callbck,error_func,lock,context){
  if (is_fetching(action)){
    __.error("图片上传中，请稍等或刷新页面重新发送");
	  return;
  }
  
  fetch_status[action] = true;
  
  var iframe_id = "frame_"+Math.floor(Math.random()*100000);
  var iframe_name = "frame_name_"+Math.floor(Math.random()*100000);
  $('#frame_wrapper').empty().append('<iframe name="'+iframe_name+'" id="'+iframe_id+'" class="hidden"></iframe>');
	
	var self = $(this);
	
	$('#'+iframe_id).bind('load',function(){
	  	fetch_status[action] = false;
		if (lock) __.unlock(lock);
	  self.each(function(){
	    this.reset();
	  });
		get_iframe_result(iframe_id,callbck,error_func,context);
	});
	
	$(function(){
	  self.each(function(){
	    this.action =  (action.indexOf('?') < 0 ? action + '?ts='+ $.now() : action + "&ts=" + $.now() );
    	this.target = iframe_name;
    	this.submit();
	  });
	});
}

window.iframe_callback = null;
$.fn.submit_with_iframe_redirect = function(action,callbck,error_func,lock,context){
  if (is_fetching(action)){
    __.error("图片上传中，请稍等或刷新页面重新发送");
	  return;
  }
  
  fetch_status[action] = true;
  
  var iframe_id = "frame_"+Math.floor(Math.random()*100000);
  var iframe_name = "frame_name_"+Math.floor(Math.random()*100000);
  $('#frame_wrapper').empty().append('<iframe name="'+iframe_name+'" id="'+iframe_id+'" class="hidden"></iframe>');
	
	var self = $(this);
	
  var timeout = setTimeout(function() {
		fetch_status[action] = false;
    if (window.iframe_callback) {
      window.iframe_callback = null;
      error_func.call(context,"图片上传超时，请再试一次");
			window.send_crash_org("upload_err_timeout");
    }
  },480000);
	  
	window.iframe_callback = function(result) {
	    clearTimeout(timeout);
	    window.iframe_callback = null;
		  fetch_status[action] = false;
	    if (lock) __.unlock(lock);
	    self.each(function(){
	      this.reset();
	    });
	    
	    // try{
	  		if (result == "1"){
	  			error_func.call(context,"图片上传失败,请检查图片的大小");
					window.send_crash_org("upload_err_1");
	      }else if (result == "2"){
	  			error_func.call(context,"上传的图片格式错误，请上传常用格式图片文件");
					window.send_crash_org("upload_err_2");
	      }else if (result === "0"){
	  			error_func.call(context,"上传的图片格式错误，请上传常用格式的图片文件");
					window.send_crash_org("upload_err_0");
	  		}else if (result === undefined){
	  			error_func.call(context,"图片上传失败,请检查图片大小");
					window.send_crash_org("upload_err_");
	  		}else{
	  			callbck.call(context,result);
	  		}
				// 	    }catch(e){
				// 	      error_func.call(context,"上传图片格式错误，请上传常用格式的图片文件");
				// window.send_crash_org("upload_err");
				// 	    }
	};
	
	$(function(){
	  self.each(function(){
	    this.action =  (action.indexOf('?') < 0 ? action + '?ts='+ $.now() : action + "&ts=" + $.now() ) ;
    	this.target = iframe_name;
    	this.submit();
	  });
	});
}


});//end of loadit