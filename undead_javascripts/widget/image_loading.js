loadit("add_loading_img",function(){
$.fn.add_loading_img = function() {
	if ($(this).find(".img_frame_loading").length > 0) return;
	
  $(this).append('<img class="img_frame_loading" src="'+$_.static_url('/images/loading2.gif')+'" style="z-index:1001;position:relative;" />')
  $(this).find(".img_frame_loading").each(function(){
    var width = $(this).parent().find(".img_content").width()/2;
    var height = $(this).parent().find(".img_content").height()/2;
    var self_width = 8;
    var self_height = 8;

    $(this).css("top",-height+self_height+"px");
    $(this).css("left",-width-self_width-30+"px");
  });
}

$.fn.remove_loading_img = function () {
  $(this).find(".img_frame_loading").remove();
}

});//end of loadit