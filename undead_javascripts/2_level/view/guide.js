loadit("View.Guide",function(){
View.Guide = View.Base.extend({
	el: $(".guide"),
	events: {
		"click .guide_btn": "on_guide"
	},
	initialize: function(){
		this.channel_name = $("#chl_name").valid_view(Valid.Underline,{
		  dis_error_span: $(".tip_wrap p")
		});
		var self = this;
		__.fail = function(s) {
			setTimeout(function() {
				self.channel_name.dis_error(s);
			},100);
		}
	},
	render: function(){},
	on_guide: function() {
		ValidCenter(
			this.channel_name,
      function(){
			var data = "channels="+ encodeURIComponent( this.channel_name.val());
		  $.fetch({
				type: "POST",
				url: "/channels/create_init",
				data: data,
				success : function(result){
				  App.goto(__user_return_to);
				}
			});
		},this);
	}
})
});//end of loadit