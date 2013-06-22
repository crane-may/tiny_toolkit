loadit("Widget.SelectChannelBox",function(){
Widget.SelectChannelBox = Widget.Base.extend({
	tagName: "dl",
	className: "dropdown",
	template: _.template(
		'<dt><a href="javascript:void(0)" class="more_cnl_btn"><span class="word_shortcut">所有日记主题</span></a></dt>'+
	  '<dd><ul class="select_channel_panel" style="display:none;<#= self.without_user_length() > 8 ? "height:260px;" : "" #>">'+
		'</ul></dd>'
	),
	events:{
		"click a":"on_click"
	},
	initialize:function(){
		this.selected_id = null;
		App.on("change:current_tweet_channel_id",function(m,chl_id) {
			this.$("dt span").html(this.model.get(chl_id).name_with_icon()).addClass("chl_selected");
			this.selected_id = chl_id;
		},this);
	},
	render:function(){
		var self = this;
		
		this.$el.html(this.template({self:this.model}));
		if (this.title) this.$("dt span").html(this.title);
		
		this.$("ul").append(
			this.model.reduce(function(memo,chl) {
				if (chl.is_user()) return memo;
				var item = $('<li class="word_shortcut"><a href="javascript:void(0)" class="word_shortcut '+chl.level()+" "+ (this.model.without_user_length() > 8 ? "chl_with_scroll" : "") 
											+'" >'+chl.name_without_icon()+'</a></li>');
				var _chl = chl;
				item.click(__.prevent(function() {
					App.set("current_tweet_channel_id",_chl.id);
					self.$("ul").hide();
				}));
				return memo.add( item );
			},$(),this)
		);
		if (this.current_channel_id) App.set("current_tweet_channel_id", this.current_channel_id );
		
		// $(document).bind('click', function(e) {
		// 	 var $clicked = $(__.event(e));
		//        if (! $clicked.parents().hasClass("dropdown")){
		//            self.$("ul").hide();
		//        }
		//     });

		App.on("document_click",function(e) {
			if (e){
				if (! $(__.event(e)).parents().hasClass("dropdown")){
				  self.$("ul").hide();
				}		
			}else{
				self.$("ul").hide();
			}
		});

		return this;
	},
	val: function() {
		return this.selected_id
	},
	on_click:function(){
		this.$("dd ul").toggle();
		if ($.browser.msie && /[67][.]0/.test($.browser.version) && App.views.editor.editor){
			$(App.views.editor.editor.document.body).blur();
		}
	}
});

Widget.SelectChannelLabel = Backbone.View.extend({
	el:$("#numofchannels"),
	initialize: function() {
		App.on("change:current_tweet_channel_id", function(m,chl_id) {
			this.$el.html("您选择了\"<span class='fB'>"+this.model.get(chl_id).name_with_icon()+"</span>\"主题");
		},this);
	}
});
});//end of loadit