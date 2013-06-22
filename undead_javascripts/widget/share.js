loadit("Widget.ShareLine",function(){
var form_tar = null;
window.share_to = function(s) {
	form_tar.find("#share_site").val(s);
	form_tar.submit();
}

Widget.ShareLine = function (tid,chl_name,selection) {
	if (!selection) selection = "";
	form_tar = $('<span class="left cGray2">分享到：'+
	'<a class="share_button share_button_tsina"  href="javascript:;" onclick="share_to(\'sinaminiblog\')" title="分享到新浪微博" >&nbsp;</a>'+
	'<a class="share_button share_button_douban" href="javascript:;" onclick="share_to(\'douban\')"       title="分享到豆瓣" >&nbsp;</a>'+
	'<a class="share_button share_button_qzone"  href="javascript:;" onclick="share_to(\'qzone\')"        title="分享到Qzone" >&nbsp;</a>'+
	'<a class="share_button share_button_tqq"    href="javascript:;" onclick="share_to(\'qqmb\')"         title="分享到腾讯微博" >&nbsp;</a>'+
	'<a class="share_button share_button_renren" href="javascript:;" onclick="share_to(\'renren\')"       title="分享到人人" >&nbsp;</a>'+
	'<a class="share_button share_button_kaixin" href="javascript:;" onclick="share_to(\'kaixin001\')"    title="分享到开心" >&nbsp;</a></span>'+
	'<form class="left hidden" action="/day/'+tid+'" method="POST" target="_blank">'+
	'<input id="share_site" type="hidden" name="site" value="" >'+
	'<input type="hidden" name="tid" value="'+tid+'" >'+
	'<input type="hidden" name="authenticity_token" value="'+$_.csrf_token()+'">'+
	'<input type="hidden" name="chl_name" value="'+chl_name+'" >'+
	'<input type="hidden" name="selection" value="'+selection+'" ></form>');
	return form_tar;
}

Widget.ShareLineDirect = function (op) {
	form_tar = $('<span class="left cGray2">分享到：'+
	'<a class="share_button share_button_tsina"  href="javascript:;" onclick="share_to(\'sinaminiblog\')" title="分享到新浪微博" >&nbsp;</a>'+
	'<a class="share_button share_button_douban" href="javascript:;" onclick="share_to(\'douban\')"       title="分享到豆瓣" >&nbsp;</a>'+
	'<a class="share_button share_button_qzone"  href="javascript:;" onclick="share_to(\'qzone\')"        title="分享到Qzone" >&nbsp;</a>'+
	'<a class="share_button share_button_tqq"    href="javascript:;" onclick="share_to(\'qqmb\')"         title="分享到腾讯微博" >&nbsp;</a>'+
	'<a class="share_button share_button_renren" href="javascript:;" onclick="share_to(\'renren\')"       title="分享到人人" >&nbsp;</a>'+
	'<a class="share_button share_button_kaixin" href="javascript:;" onclick="share_to(\'kaixin001\')"    title="分享到开心" >&nbsp;</a></span>'+
	'<form class="left hidden" action="'+op.url+'" method="POST" target="_blank">'+
	'<input id="share_site" type="hidden" name="site" value="" >'+
	'<input type="hidden" name="authenticity_token" value="'+$_.csrf_token()+'">'+
	'<input type="hidden" name="url" value="'+op.url+'" >'+
	'<input type="hidden" name="title" value="'+op.title+'" >'+
	'<input type="hidden" name="summary" value="'+op.summary+'" >'+
	'<input type="hidden" name="pic" value="'+op.pic+'" >'+
  '</form>');
	return form_tar;
}
});