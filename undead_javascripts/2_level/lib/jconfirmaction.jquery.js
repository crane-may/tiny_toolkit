loadit("!jConfirmAction",function(){
(function($){
	jQuery.fn.jConfirmAction = function (options) {
		
		var theOptions = jQuery.extend ({
			question: "您确定要删除吗？",
			yesAnswer: "确定",
			cancelAnswer: "取消",
			on_yes: null,
			on_yes_context: null
		}, options);
		
		return this.each (function () {
			$(this).unbind('click');
			$(this).bind('click', function(e) {
				e.preventDefault();
				thisHref	= $(this).attr('href');
				
				var confirm_question = $(this).attr("confirm_question") || theOptions.question;
				
				if($(this).next('.question').length <= 0)
					$(this).after('<div class="question"><h2><span class="alert_icon"></span>&nbsp;'+confirm_question+'</h2><p class="clearfix"><a href="javascript:void(0)" class="yes">'+theOptions.yesAnswer+'</a><a href="javascript:void(0)" class="cancel"> '+theOptions.cancelAnswer+'</a></p></div>');
				
				$(this).next('.question').animate({opacity: 1}, 300);
				var self = $(this);
				if (theOptions.on_yes){
					$(this).next('.question').find('.yes').bind('click', function(){
						if (theOptions.on_yes_context)
							theOptions.on_yes.apply(theOptions.on_yes_context);
						else
							theOptions.on_yes.apply(self);
						return false;
					});
				}else{
					$(this).next('.question').find('.yes').bind('click', function(){
						window.location = thisHref;
						return false;
					});					
				}
		
				$(this).next('.question').find('.cancel').bind('click', function(){
					$(this).parents('.question').fadeOut(10, function() {
						$(this).remove();
						return false;
					});
				});
				
				return false;
			});
			
		});
	}
	
})(jQuery);
});//end of loadit