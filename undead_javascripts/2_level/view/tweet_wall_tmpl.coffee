loadit("View.TweetWall-tmpl",()->
  Template.TweetWall = """
	<a class="meta_wall" href="/messages/show/<#= core.id #>">
		<p><#= core.msg_at.date_date() #></p>
		<p><#= core.msg_at.date_time() #></p>
	</a>
	<div class="left head_pic60_frame1 round_corner_3"><a href="/userpage/<#= core.user_id#>"><img src="<#= $_.face(core.user_face, 'S2')#>" class="round_corner_3" /></a></div>
	<div class="entry_wrap">
		<div class="timeline_point_bg"></div>
		<div class="entry clearfix boxshadowN">
			<div class="entry_title">
				<p>
					<a href="/userpage/<#= core.user_id#>"><#= core.user_name#></a>
				</p>
				<p class="chl_name_bg">
				</p>
			</div>
	"""+ Template.TweetCore + Template.TweetExtend + '</div><div class="c"></div>'
)