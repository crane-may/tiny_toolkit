loadit("!modelbase",function(){
window.Mod = {};

Backbone.sync = function(method,model,options){	
	if (method != "read") throw "fetch method error";
	model.fetch_sync(options);
}

window.Mod.ModelBase = Backbone.Model.extend({
	setup_with:function(tmpl,op){
		var tp = new tmpl({model: this});
		if (op) _.extend(tp,op);
		tp.render();
		return tp;
	},
	setup_at: function(tmpl,$jq,op) {
		var tp = new tmpl({model:this, el: $jq });
		if (op) _.extend(tp,op);
		tp.render();
		return tp;
	}
})

window.App = new Mod.ModelBase();
window.App.set = function(key, value, options) {
	var changed = (this.get(key) != value);
	Mod.ModelBase.prototype.set.call(this,key,value,options);
	if ((!changed) && options && options.force_change) 
		this.trigger("change:"+key,this,value,options);
}
App.views = {};
App.refresh = function() {
	window.location.reload();
}
App.goto = function(s) {
	window.location.href = s;
}
App.on("all",function(eventName,v) {
	// console.log("App:"+eventName);
	tracecert("App:"+eventName);
})
App.one = function(evnt,func,context) {
	var cb = function() {
		App.off(evnt,cb,context);
		func.call(context);
	};
	App.on(evnt,cb,context);
}
App.delay_trigger = function(time,evnt,a) {
	_.delay(function(){
		App.trigger(evnt,a)
	},time);
}

App.on_org = App.on;
App.UET = "__url_event_";
App.url_event = function(event_name) {
	if (! App.url_events) {
		App.url_events = {}
		
		window.onpopstate = function() {
			var ms = window.location.hash.match("#!/([^/]+)/?(.+)?");
			if (ms) {
				(ms.length == 2) ? App.trigger(App.UET+ms[1]) : App.trigger(App.UET+ms[1],ms[2]);
			}else{
				App.trigger(App.UET+event_name);
			}
		}
	};
	App.url_events[event_name] = true;
	
	App.on_org(event_name,function(v) {
		history.pushState({},"","#!/"+event_name+(v?"/"+v:""));
		first_trigger = false;
		App.trigger(App.UET+event_name,v);
	});
}

App.on = function(events, callback, context) {
	if (App.url_events && App.url_events[events]) {
		App.on_org(App.UET+events,callback,context);
	}else{
		App.on_org(events,callback,context);
	}
}

window.Mod.CollectionBase = Backbone.Collection.extend({
	setup_with:function(tmpl,op){
		var tp = new tmpl({model: this});
		if (op) _.extend(tp,op);
		tp.render();
		return tp;
	},
	setup_at: function(tmpl,$jq,op) {
		var tp = new tmpl({model:this, el: $jq });
		if (op) _.extend(tp,op);
		tp.render();
		return tp;
	},
	setup_into: function(tmpl,$jq,op) {
		var tp = new tmpl({model: this});
		if (op) _.extend(tp,op);
		tp.render();
		$jq.empty().append(tp.$el);
		return tp;
	}
})

});//end of loadit