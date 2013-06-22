loadit("View.Notice",function(){
View.Notice = View.Base.extend({
	dropdown: {
		be_remarked : {
			"url":"/users/remarks",
			"info":"新回复"
		},
		be_ated: {
			"url":"/users/at_me",
			"info":"新@提到"
		},
		be_followed: {
			"url":"/users/follows",
			"info":"新订阅"
		},
        be_replied: {
            "url":window.GROUP_ROOT+"groups/noties",
            "info":"圈儿消息"
        }
	},
	initialize: function() {
		var toggler = new ___.DocClickCloseToggler({
			toggle_handler: function() {
				var width = _($('#header .user_menu_link')).reduce(function(sum,i){ return sum + $(i).outerWidth(true) },0);
				$('#notice_dropdown ul').css("margin-left",(265 - width)+"px").toggle();
			},
			close_handler: function(e) {
				$("#notice_dropdown dd ul").hide();
			},
			toggle_element: $("#notice_dropdown dt a"),
			stopPropagation_element: $("#notice_dropdown dt,#notice_dropdown dd")
		});
		App.views.notice = this;
		
		App.on("refresh_notice",function() {
		  this.update();
		},this);
		
		var self = this;
		setInterval(function() {
			self.update();
		}, (/ibooloo[.]com/.test(window.location.href) ? 5*60*1000 : 20*60*1000) );
	},
	render: function() {
		var drop_down_sum = 0;
		$("#notice_dropdown ul").empty();
		_(this.model.attributes).each(function(v,k) {
			if (/^tip_/.test(k)) return;
			
			if (v && v != "0"){
				$("#notice_"+k).html(parseInt(v)).removeClass("hidden");
			}else{
				$("#notice_"+k).html(0).addClass("hidden");
			}
			
			if (v && v != "0" && this.dropdown[k] ){
				var tar = $('<li>'+
											'<a href="'+this.dropdown[k].url+'" class="notice_content">有' + v + '条'+ this.dropdown[k].info +'</a>'+
											'<a href="javascript:void(0)">X</a>'+
										'</li>');
				var self = this;
				var k_ = k;
				tar.find("a").last().click(__.prevent(function(){
					self.model.set(k_,"0");
					self.render();
					self.ignore(k_);
				}));
				$("#notice_dropdown ul").append(tar);
				drop_down_sum += parseInt(v);
			}
		},this);
		
		if (drop_down_sum){
			$("#notice_dropdown_all").html(drop_down_sum).closest("dl").show();
		}else{
			$("#notice_dropdown_all").html("0").closest("dl").hide();
		}
		
		if ($("#receive_new_tweet_notice").length >0 && this.model.has("be_forwarded") && this.model.get("be_forwarded") != "0"){
			var tar = $('<p class="refresh_link"><a href="javascript:void(0)">有新日记，点击刷新</a></p>');
			tar.find("a").click(__.prevent(function() {
				App.one("tweet_render_over",function() {
					this.hide();
				},$(this).closest("div"));
				$(this).closest("p").html('<span class="cGray2">加载中...</span>');
				App.trigger("goto_channel",__channels.at(0).id);
			}));
			$("#receive_new_tweet_notice").empty().append(tar).show();
		}
	},
	ignore: function(k) {
		$.fetch({
			url:"/users/notice_cancel?event="+k,
			type:"POST",
			noti:"no",
			success: function(){}
		});
	},
	update: function() {
		$.fetch({
	  	url: "/users/notice",
			type: "GET",
	  	noti: "no",
			context: this,
	  	success : function(result){
	  	  this.model = new Mod.ModelBase(result);
				this.render();
	  	}
	  });
	}
})
});//end of loadit