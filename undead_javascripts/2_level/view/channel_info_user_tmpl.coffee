loadit("View.ChannelInfo-tmpl",()->
  Template.channel_info_user = """
<div class="switch_view">
	<div class="content_header_top clearfix">
		<span class="f18px fB left">个人资料</span>
		<span>主题&nbsp;&nbsp;</span><strong><#= core.channel_count #></strong>
		<span>&nbsp;&nbsp;&nbsp;&nbsp;日记&nbsp;&nbsp;</span><strong><#= core.timeline_sender_count #></strong>
		<span>&nbsp;&nbsp;&nbsp;被主题订阅数&nbsp;&nbsp;</span><strong><#= core.follower_count #></strong>	
	</div>
	<div class="content_header_bt clearfix">
		<div class="tags_wrapper"></div>
		<div class="follow_info">
			<table class="right">
				<tr>
					<td class="alR lh180"><a class="f12px cGray2" href="/users/people/<#= self.raw_id()#>">订阅<#= self.is_mine() ? "我" : "TA"  #>的人</a></td>
					<td class="alR lh180 cGray2">&nbsp;&nbsp;<a class="f12px cGray2" href="/users/people/<#= self.raw_id()#>">(<#= core.user_follower_count #>)</a></td>
				</tr>
				<tr>
					<td class="alR lh180"><a class="f12px cGray2" href="/users/people/<#= self.raw_id()#>?followings=true"><#= self.is_mine() ? "我" : "TA" #>订阅的人</a></td>
					<td class="alR lh180 cGray2">&nbsp;&nbsp;<a class="f12px cGray2" href="/users/people/<#= self.raw_id()#>?followings=true">(<#= core.user_following_count #>)</a></td>
				</tr>
			</table>
		</div>
	</div>
</div>

""")