loadit("View.BookView",function(){


var book_catalog_tag = $(".book_catalog_tag");
var book_catalog_content = $(".book_catalog_content");

var scroll_line = 9999999999;

var on_scroll = function() {
  if($(window).scrollTop() >= scroll_line) {
	book_catalog_tag.removeClass("hidden2");
  } else {
	book_catalog_tag.addClass("hidden2");
	book_catalog_content.hide();
	book_catalog_tag.removeClass("book_catalog_close");
  }
};

var on_resize = function() {
	book_catalog_tag.css("left",document.getElementById("page_content").offsetLeft + 960);
	book_catalog_content.css("left",document.getElementById("page_content").offsetLeft + 960 - 216);
};
	
View.BookView = View.Base.extend({
	el:$("#posts"),
	template: _.template(Template.BookView),
	initialize:function(){
		var code = "";
		App.on("change:current_channel_id",function(m,chl_id){
			if (chl_id == this.model.id){
				App.off("change_to_book");
				App.on("change_to_book",function(){
					$("#pageinate").empty();
					this.$el.html("<div class='loading' ><img src='"+$_.static_url('/images/loading.gif')+"'></div>");
					$.fetch({
						url:"/books/frame/"+this.model.id+(window.__code ? "?code="+encodeURIComponent(__code) : ""),
						type:"GET",
						context: this,
						success:function(result) {
							this.$el.html(this.template({is_mine: this.model.is_mine(),channel_id:this.model.id}));
							this.init_create();
							this.result = result;
							this.load_menu(result.menus);
						}
					})
				},this);
			}
		},this);
	},
	init_create:function() {
		var self = this;
		this.$(".book_add_index").click(__.prevent(function() {
			Dialog.CommonPrompt.open(null,{
				title: "添加新目录",
				default_value: "",
				valid: "menu",
				callback: function(s) {
					$.fetch({
						url:"/books/add_menu/"+self.model.id,
						type:"POST",
						data:"name="+encodeURIComponent(s.val()) ,
						success:function(result,ts) {
							self.menus_arr.push(result);
							self.load_menu();
							$.modal.close();
						}
					})
				},
				extra_valid: function(s) {
					var menu_name = s.val();
					if (self.menus_arr.length >= 14) {
						__.fail("目录总数不能超过14个");
						return false;
					};
					if (_(self.menus_arr).find(function(i) {return menu_name == i.name;})){
						__.fail("包含重复的目录名称");
						return false;
					}
					return true;
				},
				callback_context: self
			});
		}));
	},
	load_menu:function(menus_arr) {
		if (menus_arr) this.menus_arr = menus_arr;
		var dis = this.$("ul").empty();
		var self = this;
		this.$(".book_content").detach();
		var fix_menu = $("#book_fix_menu").empty();
		
		__books_menus_len[this.model.id] = this.menus_arr.length;
		
		_(this.menus_arr).each(function(dic,idx) {
			var tar = $('<li><span class="left"><a href="javascript:void(0)">'+_.escape(dic.name).space2nbsp()+'</a></span>'+
			(self.model.is_mine() ?
			    '<a class="hover_show" href="javascript:void(0)">重命名</a>&nbsp;&nbsp;<a class="hover_show" href="javascript:void(0)">删除</a>&nbsp;&nbsp;'+
				'<a class="hover_show" href="javascript:void(0)">上移</a>&nbsp;&nbsp;<a class="hover_show" href="javascript:void(0)">下移</a></li>'
				: ""));
			
			tar.find(".hover_show").hide();
			tar.hover(function() {
				tar.find(".hover_show").fadeIn(50);
			},function() {
				if (tar.find(".question").length == 0) 
					tar.find(".hover_show").fadeOut(50);
			});
 			if (!dic.tweets_view) {
 				dic.tweets_view = App.setup_with(View.BookViewTweets,{ tweet_list:dic.msgs, tweets_dic: this.result.tweets });
 			}
 			dic.tweets_view.update_name(dic.name);
 			this.$el.append(dic.tweets_view.$el);			
			
			var del_func = function() {
				var id_ = dic.id;
				var now_idx = idx;
				return function() {
					$.fetch({
						url: "/books/del_menu/"+self.model.id,
						data: "mid="+id_,
						type: "POST",
						success: function() {
							self.menus_arr.splice(now_idx,1);
							self.load_menu();
						}
					});
				}
			}();
			
			var move_up_func = function(){
				var now_idx = idx;
				return function() {
					if (now_idx > 0) {
						$(this).closest("li").die().fadeOut("fast",function() {
							var tar = $(this).addClass("hover_show_none");
							tar.prev().before(tar.detach());
							tar.fadeIn("fast",function() {
								var t = self.menus_arr[now_idx];
								self.menus_arr[now_idx] = self.menus_arr[now_idx-1];
								self.menus_arr[now_idx-1] = t;
							
								self.load_menu();
								self.save_seq();								
							});
						})
					}
				}
			}();
			
			var move_down_func = function(){
				var now_idx = idx;
				return function() {
					if (now_idx < self.menus_arr.length - 1) {
						$(this).closest("li").die().fadeOut("fast",function() {
							var tar = $(this).addClass("hover_show_none");
							tar.next().after(tar.detach());
							tar.fadeIn("fast",function() {
								var t = self.menus_arr[now_idx];
								self.menus_arr[now_idx] = self.menus_arr[now_idx+1];
								self.menus_arr[now_idx+1] = t;
						
								self.load_menu();
								self.save_seq();
							});							
						});
					}
				}
			}();
			
			var rename = function() {
				var id_ = dic.id;
				var nm_ = dic.name;
				var now_idx = idx;
				return function() {
					Dialog.CommonPrompt.open(null,{
						title: "重命名目录",
						default_value: nm_,
						valid: "menu",
						callback: function(s) {
							var nm = s.val();
							if (nm == nm_){
								$.modal.close();
								return;
							}
							$.fetch({
								url:"/books/update_menu/"+self.model.id+"?mid="+id_,
								type:"POST",
								data:"name="+encodeURIComponent(nm),
								success:function(result,ts) {
									self.menus_arr[now_idx].name = nm;
									self.load_menu();
									$.modal.close();
								}
							})
						},
						extra_valid: function(s) {
							var menu_name = s.val();
							if (_(self.menus_arr).find(function(i) {return menu_name == i.name && id_ != i.id ;})){
								__.fail("包含重复的目录名称");
								return false;
							}
							return true;
						},
						callback_context: self
					});
				}
			}();
			
			var scroll_to = function() {
				var dis_to = dic.tweets_view.$el;
				return function() {
					$.scrollTo(Math.ceil(dis_to.offset().top),100);
				}
			}();
			
			
			dis.append(tar);
			
			tar.find("a:eq(0)").click(__.prevent(scroll_to));
			tar.find("a:eq(1)").click(__.prevent(rename));
			tar.find("a:eq(2)").jConfirmAction({ on_yes:del_func});
			tar.find("a:eq(3)").click(__.prevent(move_up_func));
			tar.find("a:eq(4)").click(__.prevent(move_down_func));
			
			if (idx == 0) tar.find("a:eq(3)").addClass("disabled");
			if (idx == this.menus_arr.length - 1) tar.find("a:eq(4)").addClass("disabled");
			
			var fix_menu_item = $('<li><a href="javascript:void(0)">• &nbsp;'+_.escape(dic.name).space2nbsp()+'</a></li>');
			fix_menu_item.find("a").click(__.prevent(scroll_to));
			fix_menu.append(fix_menu_item);
		},this);
		
		App.trigger("tweet_render_over");
		
		if (this.menus_arr.length == 0) {
			this.$(".book_add_diary").hide();
			$(".book_catalog_tag").addClass("hidden");
		}else{
			this.$(".book_add_diary").show();
			$(".book_catalog_tag").removeClass("hidden");
			$(".book_catalog_content").hide();
			this.init_float_catalog();
		}
	},
	init_float_catalog: function() {
		book_catalog_tag.addClass("hidden2");
		scroll_line = $(".book_content:first").offset().top - 30;
		
		$(window).unbind("scroll",on_scroll).scroll(on_scroll);
		
		if (!($.browser.msie && /[6][.]0/.test($.browser.version))){
			$(window).unbind("resize",on_resize).resize(on_resize);
			on_resize();
		}
	
		$(".book_catalog_tag").unbind("click").click(__.prevent(function() {
			book_catalog_content.toggle();
			$(this).toggleClass("book_catalog_close");
		}));
	},
	save_seq:function() {
		$.fetch({
			url: "/books/change_menu_order/"+this.model.id,
			type: "POST",
			data: "menus="+_(this.menus_arr).map(function(i){return i.id}).join(","),
			success: function(result) {
			}
		});
	}
})

});//end of loadit
