loadit("Widget.PicFullScreen",function(){
Widget.PicFullScreen = Widget.Base.extend({
	el:$("body"),
	initialize: function() {
	},
	show_pic: function(src) {
		this.content.find(".image_review").html("<img src='"+src+"' />");
		this.content.find("a").attr("href",src.replace(/[-]X2/,"-org.jpg"));
		if (this.src_index >= 0) {
			this.content.find(".image_review_switch span").html(" &nbsp; "+(this.src_index+1)+" / "+(this.src_list.length)+" &nbsp; ");
		}else{
			this.content.find(".image_review_switch").hide();
		}
	},
	show_next:function() {
		if (this.src_index >= 0 && this.src_index < this.src_list.length - 1) {
			this.src_index++;
			this.show_pic(this.src_list[this.src_index]);
		}
	},
	show_prev:function() {
		if (this.src_index > 0) {
			this.src_index--;
			this.show_pic(this.src_list[this.src_index]);
		}
	},
	render: function() {
		var overlay = $('<div></div>')
						.attr('id', "picFullScreen_overlay")
						.addClass('simplemodal-overlay')
						.css({
							display: 'none',
							opacity: 0.8,
							height: $(document).height(),
							position: 'fixed',
							left: 0,
							top: 0,
							zIndex: 10001
						});
		this.content = $("<div class='image_review_wrapper' style='display:none;'>"+
							"<div class='image_review_switch'><a href='javascript:void(0)' class='prev'>◄</a><span></span><a href='javascript:void(0)' class='next'>►</a></div>"+
							"<div class='image_review'></div><a href='javascript:void(0)' onclick='(event.stopPropagation && event.stopPropagation())||(window.event.cancelBubble = true)||true' target='_blank'>查看原图</a></div>");
		this.$el.append(overlay).append(this.content);
		overlay.show();
		var last_scroll = __.scrollTop();
		$("html").css("overflow","hidden");
		this.content.show().height(__.clientHeight());
		
		if (this.src_list){
			this.src_index = _(this.src_list).indexOf(this.src);
		}else{
			this.src_index = -1;
		}
		this.show_pic(this.src);
		
		var self = this;
		this.content.find(".image_review_switch").click(__.prevent(function(event) {
			a = event.stopPropagation && event.stopPropagation();
		}));
		this.content.find(".prev").click(__.prevent(function(event) {
			a = event.stopPropagation && event.stopPropagation();
			self.show_prev();
		}));
		this.content.find(".next").click(__.prevent(function(event) {
			a = event.stopPropagation && event.stopPropagation();
			self.show_next();
		}));
		
		
		var on_resize = function() {
			self.content.height(__.clientHeight());
		}
		$(window).resize(on_resize);
		var on_keyup = function(e) {
			if(e.keyCode == 37) self.show_prev();
			if(e.keyCode == 39) self.show_next();
		}
		$(window).keyup(on_keyup);
		this.content.click(__.prevent(function(event) {
			overlay.remove();
			self.content.remove();
			$("html").css("overflow","auto");
			__.scrollTop(last_scroll);
			$(window).unbind("resize",on_resize);
			$(window).unbind("keyup",on_keyup);
		}));
	}
});
});//end of loadit
