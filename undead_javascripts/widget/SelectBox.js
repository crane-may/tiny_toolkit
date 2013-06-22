loadit("Widget.SelectBox",function(){
Widget.SelectBox = Widget.Base.extend({
	tagName: "dl",
	className: "dropdown",
	template: _.template(
		'<dt><a href="###" class="more_cnl_btn"><span class="word_shortcut">请选择</span></a></dt>'+
	    '<dd><ul class="select_channel_panel" style="display:none;<#= self.length > 8 ? "height:260px;" : "" #>">'+
		'</ul></dd>'
	),
	events:{
		"click li.a":"on_click"
	},
	initialize:function(){
		this.selected_id = null;
		App.on("change:current_selectbox_select_id",function(m,select_id) {
			this.$("dt span").html(this.model.get(select_id).get("name").channel_name()).addClass("chl_selected");
			this.selected_id = select_id;
		},this);
	},
	render:function(){
		var self = this;
		
		this.$el.html(this.template({self:this.model}));
		if (this.title) this.$("dt span").html(this.title);
		
		this.$("ul").append(
			this.model.reduce(function(memo,i) {
				var item = $('<li class="word_shortcut"><a href="javascript:void(0)" class="word_shortcut public '+ (this.model.length > 8 ? "chl_with_scroll" : "") 
											+'" >'+_.escape(i.get("name")).space2nbsp()+'</a></li>');
				var _i = i;
				item.click(__.prevent(function() {
					App.set("current_selectbox_select_id",_i.id);
					self.$("ul").hide();
				}));
				return memo.add( item );
			},$(),this)
		);
		if (this.current_menu_id) App.set("current_selectbox_select_id", this.current_menu_id );

		App.on("document_click",function(e) {
			if (e){
				if (! $(__.event(e)).parents().hasClass("dropdown")){
				  self.$("ul").hide();
				}		
			}else{
				self.$("ul").hide();
			}
		});
		
		this.$("dt a").click(__.prevent(function() {
			self.$("dd ul").toggle();
		}));
		
		return this;
	},
	val: function() {
		return this.selected_id
	},
	on_click:function(){
		this.$("dd ul").toggle();
	}
});

});//end of loadit
