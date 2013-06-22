loadit("Widget.ChannelName",function() {
Widget.ChannelName = Widget.Base.extend({
  events:{},
  initialize:function() {
  },
  render: function() {
    this.$el.html('<a href="/userpage/'+this.model.get("user_id")+'?channel='+this.model.get("channel_id")+'">'+this.model.get("channel_name").channel_name()+'</a>'+
          (!this.no_follow ? '<span class="follow_actions '+(__.is_mobile_phone()?'':'hover_show" style="display: none;')+'"></span>' :'') );
    if (!this.no_follow) this.model.setup_at(Widget.TinyFollowButton, this.$(".follow_actions"));
  }
});
});