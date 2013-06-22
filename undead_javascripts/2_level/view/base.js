loadit("!View-base",function(){
window.View = {};
window.Template = {};

window.View.Base = Backbone.View.extend({
	constructor : function(options) {
		// console.debug("init "+this.get_scope());
	  this.cid = _.uniqueId('view');
	  this._configure(options || {});
	  this._ensureElement();
	  this.initialize.apply(this, arguments);
	  this.delegateEvents();
	}
});

View.Base.extend = function(protoProps, classProps) {
	var _scope = window.loading_scope || "unknow" ;
	_.extend(protoProps,{
		get_scope: function() {return _scope}
	})
	var child = Backbone.View.extend.call(this,protoProps,classProps);
	child.extend = this.extend;
	return child;
}

// _.extend(View.Base.prototype,Backbone.View.prototype);

window.View.SwitchBase = window.View.Base.extend({
	render: function() {
		var jq = this.build();
		this.setElement(jq);
		if (this.switch_el.find(".switch_view").length > 0){
			jq.hide();
		}
		
		this.switch_el.append(jq);
	},
	select: function() {
		this.switch_el.find(".switch_view:visible").hide();
		this.$el.show();
	}
})
});//end of loadit