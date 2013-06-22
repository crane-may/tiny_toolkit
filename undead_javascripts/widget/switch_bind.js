loadit("switch_bind",function(){
$.fn.switch_bind = function (panels, highlight_class) {
	if ($(this).length != panels.length) throw "switch_bind with different numbers of bars and panels";
	var i = 0;
	var self = $(this);
	var panels_ = panels;
	return this.each(function() {
		var i_ = i;
		$(this).click(__.prevent(function() {
			self.not($(this).addClass(highlight_class)).removeClass(highlight_class);
			panels_.not($(panels_[i_]).show()).hide();
		}));
		i += 1;
	})
}
});//end of loadit