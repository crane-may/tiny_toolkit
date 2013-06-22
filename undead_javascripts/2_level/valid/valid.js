loadit("!validcenter",function(){
	
window.ValidCenter = function(valid_list,callback,context,lock){
	if (_.isObject(valid_list) && _.isUndefined(callback)){
		var op = valid_list;
		valid_list = op.valid;
		callback = op.callback;
		context = op.context;
		lock = op.lock;
	}
	
	if (! _.isArray(valid_list) ) valid_list = [valid_list];
	var err_list = _(valid_list).find(function(vv){
		if (vv instanceof Backbone.View){
			return ! vv.valid();
		} else {
			return ! vv.call(context);
		}
	});
	
	if (_.isUndefined(err_list)){
		callback.call(context);
	}else{
		if (lock) __.unlock(lock);
	}
}

window.Valid.Base = Backbone.View.extend({
	initialize: function() {
		this.valid_option = window.ValidOption[this.$el.attr("data-valid")];
		if (! this.valid_option) throw "data-valid error";
	},
	valid: function() {
		var s = this.$el.val().trim();
		this.$el.val(s);
		
		var err_list = _( _.union(this.check_list,this.check_list_extend) ).find(function(func){
			if ( this["check_"+func]["valid"].call(this,s) ){
				return false;
			}else{
				this.dis_error( this["check_"+func]["fail_message"].call(this,s) );
				return true;
			}
		},this);
		
		return _.isUndefined(err_list) && (this.recover_error() || true);
	},
	recover_error: function() {},
	val: function(v) {
		if (_.isUndefined(v))
			return this.$el.val().trim();
		else
			this.$el.val(v);
	},
	check_list: ["empty","max","min","regex"],
	check_list_extend: [],
	check_empty: {
		valid: function(s) {
			return ! (this.valid_option.not_empty && s.trim() == "");
		},
		fail_message: function(s) {
			return this.valid_option.label+"不能为空";
		}
	},
	check_max: {
		valid: function(s) {
			if (this.valid_option.chs_len1) {
				return s.length <= this.valid_option.max;
			}else{
				return s.eng2len() <= this.valid_option.max;
			}
		},
		fail_message: function(s) {
			var len = this.valid_option.max;
			if(this.valid_option.not_unicode)
				return this.valid_option.label+"太长,最多"+len+"位英文字母或数字";
			else{
				if (this.valid_option.chs_len1) {
					return this.valid_option.label+"太长,最多"+len+"位中文、英文或数字";
				}else{
					return this.valid_option.label+"太长,最多"+Math.ceil(len/2)+"位中文或"+len+"位英文(数字)";
				}
			}
		}
	},
	check_min: {
		valid: function(s) {
			return s.eng2len() >= this.valid_option.min;
		},
		fail_message: function(s) {
			var len = this.valid_option.min;
			if(this.valid_option.not_unicode)
				return this.valid_option.label+"太短,最少"+len+"位英文字母或数字";
			else
				return this.valid_option.label+"太短,最少"+Math.ceil(len/2)+"位中文或"+len+"位英文(数字)"
		}
	},
	check_regex: {
		valid: function(s) {
			return s.match(this.valid_option.regex);
		},
		fail_message: function(s) {
			return this.valid_option.info;
		}
	},
	dis_error: function(s) {
		__.fail(s);
	}
});

$.fn.valid_view = function(v_templ,op){
	if ( $(this).length != 1 ) throw "valid_view count only can be 1";
	if (! $(this).attr("data-valid")) throw "valid_view without reason";
	
	if ($(this).attr("ref")){
		var v = window.ValidStore[$(this).attr("data-valid_id")];
		if (v.el === $(this)[0]){
			return v;
		}
	}
	
	var key = "v" + _(window.ValidStore).size();
	var vv = new v_templ({el: $(this) });
	if (op) _.extend(vv,op);
	
	window.ValidStore[key] = vv;
	$(this).attr("data-valid_id",key);
	
	return vv;
}
});//end of loadit