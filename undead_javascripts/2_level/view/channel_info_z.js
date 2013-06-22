loadit("View.ChannelInfo",function(){
View.ChannelInfo = View.SwitchBase.extend({
	switch_el: $("#content_header"),
	chl_template: _.template(Template.channel_info_chl),
	user_template: _.template(Template.channel_info_user),
	events:{
		"click .rename_channel_btn":"on_rename",
		"click .resort_channel_btn":"on_resort",
		"click .del_channel_btn":"on_del",
		"click .public_channel_btn":"on_public",
		"click .private_channel_btn":"on_private",
		"click .private_inv":"on_invitation"
	},
	initialize: function() {
		App.on("change:current_channel_id",function(m,chl_id){
			if (chl_id == this.model.id){
				this.select();
			}
		},this);
	},
	build: function() {
		var jq = this.model.is_user() ? 
								$(this.user_template({self:this.model,core:this.model.toJSON()})) :
								$(this.chl_template({self:this.model,core:this.model.toJSON(),userpage:false})) ;
		
		this.model.setup_at( View.Tag,  jq.find(".tags_wrapper"));
		if ((!this.model.is_mine()) && (!this.model.is_user())) {
			this.model.setup_at( Widget.DayTile, jq.find('.follow_actions'));
		}
		return jq;
	},
	on_rename: function() {	Dialog.RenameChannel.open(this.model); },
	on_resort: function() { Dialog.ResortChannel.open(__self_channels);	},
	on_del: function() { Dialog.DelChannel.open(this.model); },
	on_public: function() { Dialog.PublicChannel.open(this.model); },
	on_private: function() { Dialog.PrivateChannel.open(this.model); },
	on_invitation: function() {
		$.fetch({
			url:"/channels/generate_invitation/"+this.model.id,
			type: "GET",
			context: this,
			success:function(result){
				Dialog.Invitation.open(this.model,{invitation_code: result});
			}
		});
	}
})
});//end of loadit