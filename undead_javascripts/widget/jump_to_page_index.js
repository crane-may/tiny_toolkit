loadit("jump_to_page_index",function(){
$.extend({
	jump_to_page_index: function(page_idx){
		var url = location.href;
		url = url.replace(/#.*$/,"");
		if (! /[?&]page=/.test(url)){
			if (/[?]/.test(url)){
				location.href = url + "&page="+page_idx;
			}else{
				location.href = url + "?page="+page_idx;
			}
		}else{
			if (/[?]page=/.test(location.href)){
				location.href = url.replace(/[?]page=\d+/,"?page="+page_idx);
			}else{
				location.href = url.replace(/[&]page=\d+/,"&page="+page_idx);
			}
		}
	}
});

});//end of loadit