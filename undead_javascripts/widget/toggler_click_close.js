loadit("DocClickCloseToggler",function(){
___.DocClickCloseToggler = function(op_){
	var op = {
		open_handler: null,
		close_handler: null,
		toggle_handler: null,
		after_open: function() {
			var self = this;
			this.doc_bind_handler = function(e){
				self.close(e);
			};
			// $(document).bind('click', this.doc_bind_handler);
			App.on("document_click",this.doc_bind_handler);
		},
		after_close: function() {
			// $(document).unbind('click',this.doc_bind_handler);
			App.off("document_click",this.doc_bind_handler);
		},
		context: this,
		default_stats: false,
		toggle_element: null,
		stopPropagation_element : null 
	}
	_.extend(op,op_);
	
	___.Toggler.call(this,op);
	
	var self = this;
	if (op.toggle_element)
		op.toggle_element.click(__.prevent(function(e){self.toggle();},true));
	
	if (op.stopPropagation_element){
		op.stopPropagation_element.click(function(e){e.stopPropagation();});
	}
}

});//end of loadit