loadit("open_unsave_alert",function(){
var alert_opened = false;
$.extend({
	open_unsave_alert:function(noti_){
		if (alert_opened) return;
		alert_opened = true;
	
		var noti = noti_;
		window.onbeforeunload = function (evt) {
		  if (typeof evt == 'undefined') {
		    evt = window.event;
		  }
		  if (evt) {
		    evt.returnValue = noti;
		  }
		  return noti;
		}
	},
	close_unsave_alert:function() {
		window.onbeforeunload = null;
		alert_opened = false;
	}
});
});//end of loadit