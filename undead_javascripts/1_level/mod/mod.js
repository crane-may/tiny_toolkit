loadit("!mod",function(){
window.Mod.Tweet = Mod.ModelBase.extend({
	txt_content : function(){
		return 	this._txt_content || (this._txt_content = _$.cccode_txt(this.get("content")) );
	},
	html_content : function(){
		return 	this._html_content || (this._html_content = _$.cccode_html(this.get("content")) );
	},
	is_mix: function(){
		return (this.collection && this.collection.type && this.collection.type == "mix");
	},
	is_mine: function(){
		return (window.CURRENT_USER_ID && this.get("user_id") == CURRENT_USER_ID);
	},
	remarks: function() {
		if (this._remarks){	
			return this._remarks 
		}	else{
			this._remarks = new Mod.Remarks();
			this._remarks.message = this;
			return this._remarks;
		}
	},
	create_remark: function(content,callback,context) {
		$.fetch({
			type: "POST",
			url: "/messages/remark/"+this.id,
			data: JSON.stringify({"content":_$.plain_html(content)}),
			success : function(result){
				callback.call(context);
			},
			lock: "remark"
		});
	},
	like: function() {
		$.fetch({
			type:"POST",
      url:"/messages/like/"+this.id,
      success:function(){}
    });
	},
	unlike: function() {
		$.fetch({
			type:"POST",
      url:"/messages/unlike/"+this.id,
      success:function(){}
    });
	}
});

window.Mod.Timeline = Mod.CollectionBase.extend({
	model: Mod.Tweet,
	line_length: 20,
	initialize: function() {
		App.on("del_tweet",function() {
			this.newest_id = 0;
		},this);
	},
	count: function(){
		return this.channel.get("timeline_"+this.type+"_count");
	},
	parse: function(resp){
		return resp["tweets"];
	},
	fetch_sync:function(options){
		if (this.newest_id && ! options.offset){
			this.fetch_new();
			return;
		}
		
		$.fetch({
			url: "/channels/tweets/"+this.channel.raw_id(),
			type:"GET",
			data: "offset="+(options.offset || "0")+(window.__code ? "&code="+encodeURIComponent(__code) : "")+
						"&limit="+this.line_length+"&timeline="+this.type+"&is_user="+this.channel.is_user(),
		  noti: "no",
			context: this,
			success : function(result,timestamp){
				options.success(result);
				this.trigger("fetch_over");
				if (result.tweets.length > 0 && ! options.offset){
					this.newest_id = result.tweets[0].id;
				}else{
					this.newest_id = null;
				}
			},
			fail: "操作好像没有成功，再试一次吧！",
			error_before:function(st){
				if (st == 417){
					__.fail("此主题被删除或隐私");
				}
			}
		});
	},
	fetch_new: function() {
		$.fetch({
			url: "/channels/tweets/"+this.channel.raw_id(),
			type:"GET",
			data: "offset=0&last="+this.newest_id+(window.__code ? "&code="+__code : "")+
					  "&limit="+this.line_length+"&timeline="+this.type+"&is_user="+this.channel.is_user(),
		  noti: "no",
			context: this,
			success : function(result,timestamp){
				if (result.tweets.length > 0){
					this.add(result.tweets,{at:0});
					if (this.length > 20)	this.remove(this.last(this.length - 20));
					this.trigger("fetch_over");					
					this.newest_id = result.tweets[0].id;
				}else{
					this.trigger("fetch_over");
				}
			},
			fail: "操作好像没有成功，再试一次吧！",
			error_before:function(st){
				if (st == 417){
					__.fail("此主题被删除或隐私");
				}
			}
		});
	}
});

window.Mod.TimelineInDay = Mod.CollectionBase.extend({
	model: Mod.Tweet,
	line_length: 20,
	count: function(){
		return 10;
	},
	parse: function(resp){
		return resp["tweets"];
	},
	fetch_sync:function(options){
		$.fetch({
			url: "/messages/messages_in_days",
			type:"GET",
			data: "offset="+(options.offset || "0")
					 +"&limit="+this.line_length+"&time="+options.time,
		  noti: "no",
			context: this,
			success : function(result,timestamp){
				options.success(result);
				if (options.offset)
					this.trigger("fetch_over");
				else
					this.trigger("fetch_over",result.count);
			},
			fail: "操作好像没有成功，再试一次吧！"
		});
	}
});

window.Mod.Channel = Mod.ModelBase.extend({
	timeline_map:{
		sender: Mod.Timeline,
		mix: Mod.Timeline,
		messages_in_day: Mod.TimelineInDay
	},
	timeline:function(tp){
		if (! _(this.timeline_map).has(tp) ) throw "timeline type error";
		
		this._timeline || (this._timeline = {});

		if (! this._timeline[tp]){
			this._timeline[tp] = new this.timeline_map[tp]();
			var self = this;
			_.extend(this._timeline[tp],{	type:tp, channel:self });
		}
		
		return this._timeline[tp];
	},
	is_user:function(){
		return /^user_/.test(this.id);
	},
	raw_id:function(){
		return parseInt((this.id+"").replace(/user_/,""));
	},
	is_mine: function(){
		return (window.CURRENT_USER_ID && this.get("user_id") == CURRENT_USER_ID);
	},
	level: function() {
		return this.get("level") ? "private":"public" ;
	},
	name_with_icon: function(){
		return ( this.get("level") ? '<span class="private_icon_bg">&nbsp;</span>' : "") + (this.get("name")).channel_name();
	},
	name_without_icon: function(){
		return this.get("name").channel_name();
	}
});

window.Mod.Channels = Mod.CollectionBase.extend({
	model: Mod.Channel,
	user_channel:function(){
		return this.find(function(chl){
			return /^user_/.test(chl.id);
		});
	},
	without_user_length: function() {
		return this.filter(function(chl){
			return ! chl.is_user();
		}).length;
	}
})

window.Mod.Remark = Mod.ModelBase.extend({
	is_mine: function(){
		return (window.CURRENT_USER_ID && this.get("user_id") == CURRENT_USER_ID);
	},
	is_for_me: function() {
		return (window.CURRENT_USER_ID && this.collection.message.get("user_id") == CURRENT_USER_ID);
	}
})

window.Mod.Remarks = Mod.CollectionBase.extend({
	model: Mod.Remark,
	line_length: 20,
	count: function(){
		return this.message.get("cremark");
	},
	fetch_sync:function(options){
		$.fetch({
			url: "/messages/remarks/"+this.message.id,
			type:"GET",
			data: "offset="+(options.offset || "0")+"&limit="+this.line_length,
			context: this,
			success : function(result,timestamp){
				options.success(result);
				this.trigger("fetch_over");
			}
		});
	}
})

window.Mod.MessageList = Mod.CollectionBase.extend({
	model: Mod.Tweet,
	line_length: 30,
	render_over: 0,
	parse: function(resp){
		return _(resp.tweets).reject(function(i){
			this.last_time = i.msg_at;
			return this.get(i.id);
		},this);
	},
	fetch_sync:function(options){
		$.fetch({
	    url:"/messages/pub"+(this.last_time ? "?last_time="+encodeURIComponent(this.last_time) : "" ),
			type: "GET",
			context: this,
	    success:function(result){ 
	      options.success(result);
				this.trigger("fetch_over",this.render_over);
				this.render_over = this.length;
	    },
	    noti:"no"
	  });
	}
});

window.Mod.MessageClassify = Mod.CollectionBase.extend({
	model: Mod.Tweet,
	line_length: 30,
	parse: function(resp){
		return resp.tweets;
	},
	count: function() {return 10},
	fetch_sync:function(options){
		$.fetch({
	    url:"/messages/classify_message/"+options.classify+"?offset=0&limit="+this.line_length,
			type: "GET",
			context: this,
			cache: true,
	    success:function(result){
	      options.success(result);
				this.trigger("fetch_over");
	    },
	    noti:"no"
	  });
	}
});


window.Mod.MessageSelections = Mod.CollectionBase.extend({
	model: Mod.Tweet,
	line_length: 30,
	parse: function(resp){
		return resp.tweets;
	},
	count: function() {return 10},
	fetch_sync:function(options){
		$.fetch({
			url:"/messages/hot_selections/"+options.selection+"?offset="+(options.page ? options.page * 30 : "0")+"&limit="+this.line_length,
			type: "GET",
			context: this,
			success:function(result){
				options.success(result);
				this.trigger("fetch_over");
			},
			noti:"no"
		});
	}
});

window.Mod.MessageCommon = Mod.CollectionBase.extend({
	model: Mod.Tweet,
	line_length: 20,
	parse: function(resp){
		return resp.tweets;
	},
	count: function() {return 10},
	fetch_sync:function(options){
		$.fetch({
	    url: options.url,
			type: "GET",
			context: this,
	    success:function(result){
	      options.success(result);
				this.trigger("fetch_over");
	    },
	    noti:"no"
	  });
	}
});

window.Mod.MessageTopic = Mod.CollectionBase.extend({
	model: Mod.Tweet,
	line_length: 30,
	render_over: 0,
	parse: function(resp){
		return _(resp.tweets).reject(function(i){
			this.last_time = i.msg_at;
			return this.get(i.id);
		},this);
	},
	fetch_sync:function(options){
		$.fetch({
	    url:"/topics/tweets/"+(options.topic_id)+(this.last_time ? "?last_time="+encodeURIComponent(this.last_time) : "" ),
			type: "GET",
			context: this,
	    success:function(result){ 
	      options.success(result);
				this.trigger("fetch_over",this.render_over);
				this.render_over = this.length;
	    },
	    noti:"no"
	  });
	},
  reset_empty: function() {
    this.render_over = 0;
    this.last_time = 0;
    this.reset([]);
  }
});

window.Mod.MessageTopic2 = Mod.CollectionBase.extend({
	model: Mod.Tweet,
	line_length: 30,
	render_over: 0,
	parse: function(resp){
		return _(resp.tweets).reject(function(i){
			if (! this.last_time) this.last_time = i.msg_at;
			return false;
		},this);
	},
	fetch_sync:function(options){
		$.fetch({
	    url:(options.topic_id ? "/topics/tweets/"+(options.topic_id) : "/topics/recent_tweets" )+
          "?limit="+this.line_length+"&offset="+(options.page * this.line_length)+
          (this.last_time ? "&last_time="+encodeURIComponent(this.last_time) : "" ),
			type: "GET",
			context: this,
	    success:function(result){ 
	      options.success(result);
				this.trigger("fetch_over",this.render_over);
				this.render_over = this.length;
	    },
	    noti:"no"
	  });
	},
  reset_empty: function() {
    this.render_over = 0;
    this.last_time = 0;
    this.reset([]);
  }
});

window.Mod.Letter = Mod.ModelBase.extend({
	letter_content : function(){
		return 	this._letter_content || (this._letter_content = _$.letter_html(this.get("content")) );
	},
	letter_plain : function(){
		return 	this._letter_plain || (this._letter_plain = _$.letter_plain(this.get("content")) );
	},
	is_mine: function(){
		return (window.CURRENT_USER_ID && this.get("active_id") == CURRENT_USER_ID);
	}
});

window.Mod.Letters = Mod.CollectionBase.extend({
	model: Mod.Letter,
	parse: function(resp) {
		return resp["letters"];
	},
	fetch_sync:function(options){		
		$.fetch({
			url: "/letters/list/"+options.other_id+"?page="+options.page,
			type:"GET",
			context: this,
			success : function(result,timestamp){
				options.success(result);
				this.trigger("fetch_over",result.count,result.user_name);
			}
		});
	}
});

window.Mod.HomeLetters = Mod.CollectionBase.extend({
	model: Mod.Letter,
	fetch_sync:function(options){		
		$.fetch({
			url: "/letters/home_list?page="+options.page,
			type:"GET",
			context: this,
			success : function(result,timestamp){
				options.success(result);
				this.trigger("fetch_over");
			}
		});
	}
})


window.Mod.TweetsPage = Mod.CollectionBase.extend({
	model: Mod.Tweet,
	initialize: function(models,pages_container,page_num) {
		this.container = pages_container;
		this.page_num = page_num;
	},
	parse: function(resp) {
		return resp["tweets"];
	},
	fetch_sync: function(options) {
		$.fetch({
			url: options.url,
			type: "GET",
			data: options.data,
			noti: "no",
			context: this,
			success: function(result, ts) {
				options.success(result);
				this.container.trigger("page_over",this.page_num);
			}
		})
	}
})

window.Mod.BookArrangeLeft = Mod.ModelBase.extend({
	page_length:20,
	initialize: function(op) {
		this.count = op.count;
		this.channel_id = op.channel_id;
		this.page_count = Math.ceil(this.count/this.page_length);
		if (this.page_count == 0) this.page_count = 1;
		this.pages = [];
		for (var i=0; i < this.page_count; i++) {
			this.pages.push(new Mod.TweetsPage(null,this, i));
		}
	},
	get_page: function(pn) {
		return this.pages[pn];
	},
	fetch_page: function(pn) {
		if (this.pages[pn].length == 0) {
			this.pages[pn].fetch({
				url: "/books/to_be_arranged/"+this.channel_id,
				data: "page="+pn
			});			
		}else{
			this.trigger("page_over",pn);
		}
	}
})

window.Mod.BookArrangedMenuTweets = Mod.CollectionBase.extend({
	model: Mod.Tweet,
	initialize: function() {
		this.fetched = false;
	},
	parse: function(resp) {
		return resp["tweets"];
	},
	fetch_sync: function(options) {
		if (this.fetched) {
			this.trigger("fetch_over");
		}else{
			this.fetched = true;
			$.fetch({
				url: "/books/arranged/"+this.menu.get("channel_id")+"?mid="+this.menu.id,
				type: "GET",
				noti: "no",
				context: this,
				success: function(result, ts) {
					options.success(result);
					this.trigger("fetch_over");
				}
			})			
		}
	}
});

window.Mod.BookArrangedMenu = Mod.ModelBase.extend({
	initialize: function() {
		this.timeline = new Mod.BookArrangedMenuTweets();
		this.timeline.menu = this;
	}
});

window.Mod.BookArrangedMenus = Mod.CollectionBase.extend({
	initialize: function() {
	}
});

window.Mod.TweetPin = Mod.ModelBase.extend({
	initialize: function() {
	}
});

window.Mod.TweetPins = Mod.CollectionBase.extend({
	model: Mod.TweetPin,
	initialize: function() {
		this.loaded_count = 0;
	},
	fetch_sync: function(options) {
		this.last_time = this.last_time || this.at(0).get('operated_at');
		this.loaded_count = this.loaded_count + this.length;
		$.fetch({
			url: "/messages/recent_tweets?dim="+options.dim+"&last_time="+this.last_time+"&limit=30&offset="+this.loaded_count,
			type: "GET",
			noti: "no",
			context: this,
			success: function(result, ts) {
				this.reset(result.tweets);
				this.trigger("fetch_over");
			}
		});
	}
})

});//end of loadit