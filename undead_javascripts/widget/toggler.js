loadit("Toggler",function(){
___.Toggler = function(op_) {
	var op = {
		open_handler: null,
		close_handler: null,
		toggle_handler: null,
		after_open: null,
		after_close: null,
		context: this,
		default_stats: false
	}
	_.extend(op,op_);
	
	this.stats = op.default_stats;

	this.open = function(e) {
		op.open_handler.call(op.context,e);
		this.stats = true;
		op.after_open.call(op.context);
	}
	this.close = function(e){
		op.close_handler.call(op.context,e);
		this.stats = false;
		op.after_close.call(op.context);
	}
	this.toggle = function(e) {
		if (op.toggle_handler)
			op.toggle_handler.call(op.context,e);
		else
			this.stats ?
				op.close_handler.call(op.context,e) :
				op.open_handler.call(op.context,e);
		this.stats ^= true;
		this.stats ?
			op.after_open.call(op.context) :
			op.after_close.call(op.context);
	}
}
});//end of loadit