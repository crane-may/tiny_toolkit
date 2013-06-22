loadit("on_enter",function(){

$.fn.on_enter = function(func) {
  return this.each(function(){
		$(this).keydown(function(event){
	    if (event.keyCode == '13'){
	      event.preventDefault();      
	      func();
	    }
	  });
	});
}

});//end of loadit