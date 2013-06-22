loadit("View.Tweet-tmpl",()->
  Template.TweetCore = """
<div class="msg_content_wrapper">
<# if (core.del != 1) {#>
	<div class="msg_content"><#= self.html_content() #></div>
<# } else { #>
	<div class="del_content"><#= self.html_content() #></div>
<# } #>

<# if (core.parent) {#>
 <div class="retweet_msg_content round_corner">
 	<p class="retweet_entry_title mb10">
		<a href="/userpage/<#= core.parent.user_id#>" class="head_pic40 left">
			<img src="<#= $_.face(core.parent.user_face, 'S1')#>" class="round_corner" />
		</a>
		<a class="pl10" href="/userpage/<#= core.parent.user_id #>"><#= core.parent.user_name #></a>
		<a class="retweet_chl_name_bg" href="/userpage/<#= core.parent.user_id#>?channel=<#= core.parent.channel_id #>"><#= core.parent.channel_name.channel_name()  #></a>
		<a class="meta" href="/messages/show/<#= core.parent.id#>"><#= core.parent.msg_at.date() #></a>
	</p>
   <# if (core.parent.del != 1 ) {#>
   	<p ><#= _$.cccode_html(core.parent.content) #></p>
   	<p class="byline">
   		<span class="links">
   			<a href="/messages/show/<#= core.parent.id #>" class="links_bg retweet_link_bg">传阅原文(<#= core.parent.cretweet #>)</a>&nbsp;&nbsp;
   			<a href="/messages/show/<#= core.parent.id #>" class="links_bg reply_link_bg">回复原文(<#= core.parent.cremark #>)</a>
   		</span>
   	</p>
 	<# } else { #>
 	  <p class="<#= core.parent.del != 1 ? "":"del_retweet_content"#>">此日记已被作者删除</p>
 	<# } #>
 </div>
 <# } #>

</div>"""
  Template.TweetExtend = """
<div class="collapse_control collapse_shadow hidden"><a class="open_content_btn" onclick="javascript:void(0)" >展开内容<span class="open_content" >&nbsp;</span></a></div>
<div class="collapse_control collapse_close hidden"><a class="close_content_btn" onclick="javascript:void(0)" >收起内容<span class="close_content" >&nbsp;</span></a></div>
<div class="byline tweet_byline">
    <# if (core.week) {#>
    <a href="http://weekly.ibooloo.com/weeks/home?v=<#= core.week #>" target="_blank" class="left weekly_mark">周刊文章</a>
    <# } #>
	<# if (core.del != 1) {#>
		<span class="links">
			<# if ((self.is_mine() || self.is_mix() ) && ! self.no_del_btn) {#>
				<a href="javascript:void(0);" class="links_bg del_link_bg confirm <#= __.is_mobile_phone() ? '' : 'hover_show' #>" title="删除日记">&nbsp;</a>
			<# } #>
			
			<# if (!core.parent) {#>
				<# if (self.is_mine() && ! __.is_mobile_phone()) {#>
					&nbsp;&nbsp;<a href="/messages/edit/<#= core.id#>" class="links_bg edit_link_bg <#= __.is_mobile_phone() ? '' : 'hover_show' #>" title="编辑日记" >&nbsp;</a>
				<# } #>
				<# if (core.level == 0) { #>
					&nbsp;&nbsp;<a href="javascript:void(0);" class="links_bg retweet_link_bg  alR" title="传阅日记"><#= core.cretweet #></a>
				<# } #>
			<# } #>
			
			&nbsp;&nbsp;<a href="javascript:void(0);" class="links_bg reply_link_bg" title="回复日记" ><#= core.cremark #></a>
			
			<# if (!core.parent) {#>
				<# if (core.level == 0) { #>
					&nbsp;&nbsp;<a href="javascript:void(0);" class="links_bg like_link_bg"><#= core.clike #></a>
				<# } #>
			<# } #>
		</span>
	<# } #>
    <div class="mesure_icon hidden">&nbsp;</div>
</div>
<div class="comments_wrapper clearfix hidden">
	<div class="comments_bt round_corner clearfix">
		<div class="comment_box clearfix">
			<div class="comment_edit_panel" ></div>
			<textarea class="comment_area_tweet left" name="comment_content" data-valid="remark"></textarea>
			<a href="javascript:void(0);" class="reply_btn" data-loading="发送中...">回复</a>
			<div class="c"></div>
		</div>
		<div class="comments"></div>
		<div class="more"><a href="/messages/show/<#= core.id#>">查看更多&gt;&gt;</a></div>
	</div>
</div>
"""
  
  Template.Tweet = """
<div class="head_pic60 round_corner_3 left">
	<a href="/userpage/<#= core.user_id#>" class="head_pic_link">
		<img src="<#= $_.face(core.user_face, 'S2')#>" class="head_pic_img round_corner" />
	</a>
</div>
<div class="entry clearfix">
	<div class="entry_title">
		<p>
			<a href="/userpage/<#= core.user_id#>">
			<#= core.user_name#>
			</a>
		</p>
		<p class="chl_name_bg">
		</p>
		<a class="meta" href="/messages/show/<#= core.id#>"><#= view.no_time ? "" : core.msg_at.date() #></a>
	</div>
	"""+ Template.TweetCore + Template.TweetExtend + "</div><div class='c'></div>"
)