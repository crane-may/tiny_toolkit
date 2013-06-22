loadit("View.ChannelInfo-tmpl",()->
  Template.channel_info_chl = """

<div class="switch_view">
	<div class="content_header_top">
		<span class="f18px fB left"><#= core.name.channel_name() #></span>
		<# if (self.is_mine() ) {#>
		<span class="f12px left">&nbsp;&nbsp;&nbsp;&nbsp;此主题拥有 <#= core.timeline_sender_count #> 篇日记</span>
		<div class="chl_manage_bar clearfix">
			<a class="book_create hidden" href="javascript:void(0);" title="开启阅读模式">&nbsp;</a>
			<a class="rename_channel_btn" href="javascript:void(0);" title="修改此主题名称" >&nbsp;</a>
			<a class="resort_channel_btn" href="javascript:void(0);" title="调整此主题顺序">&nbsp;</a>		
			<# if (self.is_mine() && core.level == 0) {#>
			  <a href="javascript:void(0);" class="tip_channel_public private_channel_btn" title="设为隐私">&nbsp;</a>
			<# } #>
			<# if (self.is_mine() && core.level == 1) {#><a class="public_channel_btn" href="javascript:void(0);" title="设为公开">&nbsp;</a><# } #>
			<a class="del_channel_btn" href="javascript:void(0);" title="删除此日记主题">&nbsp;</a>
		</div>
		<# } else {#>
		<span class="follow_actions" ><a href="javascript:void(0)">订阅到</a></span>
			
		<div class="chl_manage_bar clearfix">
			<span class="f12px">此主题拥有 <#= core.timeline_sender_count #> 篇日记</span>
		</div>
		<# }#>
	</div>
	<div class="content_header_bt clearfix">
		<div class="tags_wrapper"></div>
		<div class="follow_info">
			<table class="right">
				<tr>
					<td class="alR lh180"><a class="cGray2" href="/channels/channels/<#= core.id #>" >此主题被订阅</a></td>
					<td class="alR lh180 cGray2">&nbsp;&nbsp;<a class="cGray2" href="/channels/channels/<#= core.id #>" >(<#= core.follower_count #>)</a></td>
				</tr>
				<tr>
					<td class="alR lh180"><a class="cGray2" href="/channels/channels/<#= core.id #>?followings=true">此主题已订阅</a></td>
					<td class="alR lh180 cGray2">&nbsp;&nbsp;<a class="cGray2" href="/channels/channels/<#= core.id #>" >(<#= core.following_count #>)</a></td>
				</tr>
			</table>
		</div>
	</div>
</div>

""")