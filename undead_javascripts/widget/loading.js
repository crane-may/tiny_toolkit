loadit("loading_mask",function(){

$.fn.loading_mask = function(op_) {
	var op={
		cls:"btn_loading",
		html: "提交中...",
		org_html: $(this).html()
	};
	_.extend(op,op_);
	$(this).data("loading_op",op);
	
  return this.each(function(){
		$(this).addClass(op.cls).html($(this).data("loading") || op.html);
	});
}

$.fn.loading_mask_recover = function(){
	return this.each(function() {
		var op = $(this).data("loading_op");
		if (op){
			$(this).removeClass(op.cls).html(op.org_html);
		}		
	})
}

});//end of loadit