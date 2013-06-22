loadit("Widget.NativeSelectChannel",function(){
Widget.NativeSelectChannel = Widget.Base.extend({
	events:{
		"change":"on_change"
	},
	val: function(s) {
		if (_.isUndefined(s)){
			return this.$el.val() == "_cancel" ? null : this.$el.val();
		}else{
			this.$("option").each(function(){
				if ($(this).attr("value") == s + ""){
					var self = $(this);
					setTimeout(function() {
						self.attr("selected","selected");
					},10);
				}
			});
		}
	},
	render: function() {
		this.$el.html(
      '<option value="_cancel">'+this.default_tip+'</option>'+
      this.model.map(function(chl){
				if (chl.is_user()) return "";
				else return  '<option value="'+chl.id+'">'+chl.get("name").channel_name()+'</option>';
      }).join("")
    );
	},
	on_change: function() {
		if (this.on_change_callback){
			this.on_change_callback(this.val());
		}
	},
	clear_cancel: function() {
		this.$("option").each(function(){
			if ($(this).attr("value") == "_cancel"){
				$(this).remove();
			}
		});
	}
})
});//end of loadit