loadit("easy_uploader",function(){
//113   $("#upload_img").easy_uploader({
//114     text:"自定义头像",
//115     name:"image",
//116     onchange:"upload_img(this.form);"
//117   });
$.fn.easy_uploader = function(op){
  op = $.extend({
    name: "file",
    text: "Choose File",
    onchange: null,
    ready: null,
		context: null
  },op);
  
  return this.each(function(){
	
    var tar = $('<div class="easy_uploader" style="float:left;position:relative;">'+
      				  '<a class="easy_uploader_button" href="javascript:void(0)">'+op.text+'</a>'+
      					'<input name="'+op.name+'" type="file" style="position: absolute;left: 90px;top: 8px;width:230px;cursor: pointer;display:none;filter:alpha(opacity=0);opacity:0;" HIDEFOCUS="true" multiple="multiple"/>'+
      					'</div><div style="clear:both;height:0px;width:0px"></div>');
		
		tar.find("input[type=file]").bind("change",function(e){
			if (op.onchange) op.onchange.call(op.context,e);
		});
		
		$(this).append(tar);
    var user_div = $(this);
		
    $(function(){
      if(op.ready) op.ready();
      
      user_div.find(".easy_uploader").hover(function(event){
        $(event.target).mousemove(function(e){
          e.stopPropagation();
          var self = $(e.target).closest("div");
          
          var upload_input = self.find("input[type=file]");
          
          var offset = self.offset();
          var top = e.pageY - offset.top;
          var left = e.pageX - offset.left ;
          //if(window.console) console.log( left +","+ top );
          
          if (! $.is_mouse_in(self,e)){
            upload_input.hide();
            self.find("a").removeClass("easy_uploader_button_hover");
          }else{
            upload_input.show();
            
            var self_a = self.find("a");
            if ($.is_mouse_in(self_a,e)){
              self_a.addClass("easy_uploader_button_hover");
            }else{
              self_a.removeClass("easy_uploader_button_hover");
            }
          }
          
          upload_input.css("top", (top-10) +"px").css("left",(left-180)+"px");
        });
      },function(e){
        e.stopPropagation();
        $(e.target).closest("div").unbind("mousemove").find("a").removeClass("easy_uploader_button_hover");
      });
      
    });
  });
}

$.extend({
  split_filename :function(fn){
    var fns = fn.split(/[\/\\]/);
    return fns[fns.length - 1];
  },
  is_mouse_in: function(ob,e){
    var offset = ob.offset();
    var top = e.pageY - offset.top;
    var left = e.pageX - offset.left ;
    
    var rangeX = ob.outerWidth();
    var rangeY = ob.outerHeight();
    if (top < 0 || top > rangeY || left < 0 || left > rangeX){
      return false;
    }else{
      return true;
    }
  }
});
});//end of loadit