loadit("Dialog",function(){
	
window.Dialog = window.Dialog || {};
window.DialogTempl = {};

window.Dialog.Base = Backbone.View.extend()
window.Dialog.Base.open = function(model,op) {
	var tp = new this({model:model});
	tp.undelegateEvents();
	if (op) _.extend(tp,op);
	
	var lock_handler = __.lock({
		handler: function() {
			org_yes_html = this.$(".yes").html();
			this.$(".yes").loading_mask();

			this.on_yes_orig.call(this,arguments);
		},
		lock: "dialog_yes",
		unlock: function() {
			this.$(".yes").loading_mask_recover();
		}
	});
	
	var default_model_option = {
		overlayClose: ! /<input |<textarea |thumb_list/.test(tp.template),
		containerCss: function(){
			var ret = {};
			if (tp.height) _.extend(ret,{height: tp.height});
			if (tp.width) _.extend(ret,{width: tp.width});
			return ret;
		}(),
		onShow:function(dialog){
			if (tp.on_yes) {
				tp.on_yes_orig = tp.on_yes;
				tp.on_yes = lock_handler;
			}
			tp.setElement($(dialog.data));
			if (tp.onShow) tp.onShow();
			// tp.$(".yes").click(function() {
			// 	lock_handler.call(this);
			// });
			
			if (!(tp.modal_option && ! tp.modal_option.focus)){
				setTimeout(function() {
					$(dialog.data).find("input:eq(0)").cursor_end();
				},100);
			}
		},
		onClose: function() {
			tp.is_close = true;
			tp.remove();
			$.modal.close();
		}
	};
	_.extend(default_model_option,tp.modal_option);
	if(! /<#/.test(tp.template))
		$.modal(tp.template,default_model_option);
	else
		$.modal(_.template(tp.template)({}),default_model_option);
	
	return tp;
}

});//end of loadit