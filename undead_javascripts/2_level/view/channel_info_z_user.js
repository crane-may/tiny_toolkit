loadit("View.ChannelInfoUserpage",function(){
View.ChannelInfoUserpage = View.ChannelInfo.extend({
	events:{
		"click .rename_channel_btn":"on_rename",
		"click .resort_channel_btn":"on_resort",
		"click .del_channel_btn":"on_del",
		"click .public_channel_btn":"on_public",
		"click .private_channel_btn":"on_private",
		"click .private_inv":"on_invitation",
		"click .canel_follow_chl":"on_unfollow"
	},
	build: function() {
/*
		var jq = this.model.is_user() ? 
								$('<div class="sidebar_user switch_view"><div id="datepicker"></div></div>') :
								$(this.chl_template({self:this.model,core:this.model.toJSON(),userpage:true})) ;
*/
		var jq = this.model.is_user() ? 
								$('<div class="sidebar_user switch_view"><h1 class="content_header_top f18px" style="text-align:left;font-weight:700;">全部日记</h1><p id="calendar_title" class="cGray pt5 pb5" style="padding-left:30px"></p><div id="timeline_picker"></div></div>') :
								$(this.chl_template({self:this.model,core:this.model.toJSON(),userpage:true})) ;

								
		if (this.model.is_user()){
/*
			var HEX_MAP = {0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,b:11,c:12,d:13,e:14,f:15};
			
			$LAB.script($_.static_url(JS_FILES["jqueryui_datapicker_js"])).wait(function() {
				jq.find( "#datepicker" ).datepicker({
				  dateFormat: 'yy-mm-dd',
					onSelect: function(dateText, inst) { 
						App.trigger("messages_in_day",dateText);
					},
					onChangeMonthYear: function(year,month) {
						var month_start = ((new Date(year+"/"+month+"/1")) - (new Date("2011/3/15"))) / (24*60*60*1000);

						var offset = 0;
						jq.find(".ui-datepicker-calendar a").each(function(){
							var day = month_start + offset;
							if ((__calendar.length > Math.floor(day/4)) && HEX_MAP[__calendar.charAt(Math.floor(day/4))] & (8 >> (day % 4))){
								$(this).addClass("has_diary_day");
							}
							offset += 1;
						});
					}
				});
				
				App.on("change:current_channel_id",function() {
					$("#datepicker").datepicker("setDate","");
				});
			});
*/

        App.setup_at( Widget.TimelinePicker, jq.find( "#timeline_picker" ),{cal_title:jq.find("#calendar_title")});
/*   			var timeline_picker = new TimelinePicker("timeline_picker", new Date()); */
			
			
		}	else {
			this.model.setup_at( View.Tag,  jq.find(".tags_wrapper"),{readonly: !__my_page});
			// this.model.setup_at( Widget.FollowButton, jq.find(".channel_header_button"),{unfollow_button: jq.find(".canel_follow_chl").closest("p")});
			if (!this.model.is_mine()) {
				this.model.setup_at(Widget.TinyFollowButton, jq.find(".follow_actions"),{full:true});
			}
		}
			
		return jq;
	},
	on_unfollow: function() {
		
	}
})
});//end of loadit