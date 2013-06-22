loadit("Dialog.ResortChannel",function(){
Dialog.ResortChannel = Dialog.Base.extend({
	template: DialogTempl["resort_channel"],
	width:320,
	height:455,
	events:{
		"click .yes":"on_yes"
	},
	onShow: function() {
		var check_ceil_floor = function(jq){
			jq.find("a").show();
			if (jq.next().length == 0) jq.find("a:eq(1)").hide();
			if (jq.prev().length == 0) jq.find("a:eq(0)").hide();
		}
		
		this.$("ul").append(this.model.reduce(function(memo,chl){
			if (chl.is_user()) return memo;
			var item = $('<li class="resort_chl_li">'+
						    	   '<div data-cid="'+chl.id+'" style="width:240px;height:35px;line-height:35px;color:#444444;text-align:center;">'+
												chl.get("name").channel_name()+
											'</div><a class="move_up_bt" href="javascript:void(0)" title="上移">&nbsp;</a><a class="move_down_bt" href="javascript:void(0)" title="下移">&nbsp;</a>'+
										'</li>');
			
			var go_down = function(){
				var self = $(this).closest("li");
				var self_div = self.find("div:eq(0)");
				var next_div = self.next().find("div:eq(0)");
				
				var t = self_div.html();
				self_div.html(next_div.html());
				next_div.html(t);
				
				t = self_div.attr("data-cid");
				self_div.attr("data-cid",next_div.attr("data-cid"));
				next_div.attr("data-cid",t);
			}
			
			var go_up = function(){
				var self = $(this).closest("li");
				var self_div = self.find("div:eq(0)");
				var prev_div = self.prev().find("div:eq(0)");
				
				var t = self_div.html();
				self_div.html(prev_div.html());
				prev_div.html(t);

				t = self_div.attr("data-cid");
				self_div.attr("data-cid",prev_div.attr("data-cid"));
				prev_div.attr("data-cid",t);				
			}
			
			item.find("a:eq(0)").click(__.prevent(go_up));
			item.find("a:eq(1)").click(__.prevent(go_down));
			
			return memo.add(item);
		},$(),this));
		
		check_ceil_floor(this.$("li:first"));
		check_ceil_floor(this.$("li:last"));
	},
	on_yes: function() {
		$.fetch({
	    url:"/channels/change_order",
			type: "POST",
	    data:"channels_order="+ encodeURIComponent(_(this.$("li div")).map(function(i){ return $(i).attr("data-cid") }).join(',') ),
	    success:function () {
	      __.success("保存成功");
	      App.refresh();
	    },
	    fail:"操作好像没有成功，再试一次吧！"
	  });
	}
})
});//end of loadit