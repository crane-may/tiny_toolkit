loadit("ghost_input",function(){
$.fn.ghost_input = function() {
	return this.each(function() {
		if ($(this).attr("title")){
			$(this).val($(this).attr("title"));
			$(this).unbind("focus").unbind("blur").focus(function(){
        if($(this).val() == $(this).attr("title")) $(this).val("");
	    }).blur(function(){
	      if($(this).val() == '')  $(this).val($(this).attr("title"));
	    });
		}
	});
}

$.fn.ghost_input_val = function(){
	if ($(this).attr("title") && $(this).attr("title") == $(this).val())
		return ""
	else
		return $(this).val();
}

});//end of loadit