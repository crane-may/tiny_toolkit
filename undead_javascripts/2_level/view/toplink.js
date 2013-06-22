loadit("View.Toplink",function(){

$.fn.topLink = function(settings) {
    settings = jQuery.extend({
      min: 1,
      fadeSpeed: 200,
      ieOffset: 50
    }, settings);
    return this.each(function() {
      //listen for scroll
      var el = $(this);
      el.css('display','none'); //in case the user forgot
	  
      $(window).scroll(function() {
        //stupid IE hack
        // if(!jQuery.support.hrefNormalized) {
        //   el.css({
        //     'position': 'absolute',
        //     'top': $(window).scrollTop() + $(window).height() - settings.ieOffset
        //   });
        // }
        if($(window).scrollTop() >= settings.min) {
          el.fadeIn(settings.fadeSpeed);
        }
        else {
          el.fadeOut(settings.fadeSpeed);
        }
      });
    });
};

View.Toplink = View.Base.extend({
	events: {
		"click": "on_top"
	},
	initialize:function(){
		var self = this;
		if (! __.is_mobile_phone()){
			$(document).ready(function() {		
				self.setElement($("#top-link").topLink({
		    		min: 1200,
		    		fadeSpeed: 300
		  		}));
			});
		}
	},
	render:function(){
	},
	on_top:function(a,b,c){
		a.preventDefault();
		$.scrollTo(0,300);
	}
})
});//end of loadit