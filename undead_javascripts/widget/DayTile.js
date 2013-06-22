loadit("Widget.DayTile",function(){
Widget.DayTile = Widget.Base.extend({
	events:{
		"mouseenter": "on_mousein",
		"mouseleave": "on_mouseout"
	},
	initialize:function() {
		if (! this.date){
			this.date = this.model.get("msg_at") ? this.parse_msg_at() : ( window.SERVER_TIME ? new Date(window.SERVER_TIME) : new Date() );
		}
	},
	parse_msg_at:function() {
		var times = this.model.get("msg_at").match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
		var d = new Date();
		d.setYear(times[1]);
		d.setMonth(parseInt(times[2].replace(/^0/,"")) - 1);
		d.setDate(times[3]);
		d.setHours(times[4]);
		d.setMinutes(times[5]);
		d.setSeconds(times[6]);
		return d;
	},
	week_name: ['日','一','二','三','四','五','六'],
	month_name: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
	render:function() {
		this.$el.html('<p class="tweet_week">星期'+this.week_name[this.date.getDay()]+'</p><p class="tweet_day">'+this.date.getDate()+
					  '</p><p class="tweet_month" style="display:none;">'+this.month_name[this.date.getMonth()]+'</p>');
		this.$el.addClass("tweet_mon_"+this.date.getMonth());
		this.tweet_month = this.$(".tweet_month");
	},
	on_mousein: function() {
		this.tweet_month.fadeIn();
	},
	on_mouseout: function() {
		this.tweet_month.fadeOut();
	}
})
});//end of loadit
