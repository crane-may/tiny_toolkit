loadit("Valid.Underline",function(){
Valid.Underline = Valid.Base.extend({
	events:{
		"blur":"on_blur",
		"focus":"on_focus"
	},
	initialize: function() {
		Valid.Underline.__super__.initialize.call(this);
		this.dis_error_span = this.$el.closest("div").next().find("p");
		this.info = this.$el.attr("data-info");
		this.remote_failed_store = {};
		this.dis_error_span.addClass("tip_attr normal_tip").hide();
	},
	on_blur: function() {
		var self = this;
		this.last_blur = setTimeout(function() {
			self.valid();
			self.last_blur = 0;
		},200);
	},
	on_focus: function(){
		this.recover_error(this.info);
		if (this.last_blur) clearTimeout(this.last_blur);
	},
	reset_class:function(func) {
		var self = this;
		self.dis_error_span.show().removeClass("error_tip success_tip");
		func.call(self);
		// self.dis_error_span.fadeOut(function() {
		// 	self.dis_error_span.removeClass("error_tip success_tip");
		// 	func.call(self);
		// 	self.dis_error_span.fadeIn();
		// });
	},
	dis_error: function(s) {
		this.reset_class(function() {
			this.dis_error_span.html(s.replace(/::/g,"")).addClass('error_tip');
		});
	},
	recover_error: function(s) {
		this.reset_class(function() {
			this.dis_error_span.html(s?s:"&nbsp;");
		});
	},
	success_tip: function() {
		this.reset_class(function() {
			this.dis_error_span.html("&nbsp;").addClass('success_tip');
		});
	},
	loading_tip: function() {
		this.dis_error_span.html("&nbsp;").addClass('loading_tip');
	},
	loading_over: function() {
		this.dis_error_span.removeClass('loading_tip');
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
		
		return _.isUndefined(err_list) && (this.success_tip() || true);
	},
	check_remote: {
		valid: function(s) {
			if (this.remote_failed_store[s]){
				return this.remote_failed_store[s].result;
			}else{
				this.loading_tip();
				$.fetch({
					url: this.remote.url(s),
					noti: "no",
					type: "GET",
					cache: true,
					context: this,
					success: function(result) {
						this.remote_failed_store[s] = {"result":result};
						this.loading_over();
						this.valid();
					},
					error_417: function(err) {
						this.remote_failed_store[s] = {"result":false};
						this.loading_over();
						this.valid();
					}
				});
				return true;
			}
		},
		fail_message: function(s) {
			return this.remote.error;
		}
	},
	check_exter: {
		valid: function(s) {
			return this.exter.valid.call(this.exter.context,s);
		},
		fail_message: function(s) {
			return this.exter.error;
		}
	}
})

});// end of loadit