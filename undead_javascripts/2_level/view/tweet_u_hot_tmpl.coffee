loadit("View.TweetHot-tmpl",()->
  Template.TweetHot = """
	<div class="entry_wrap">
	    <div class="entry_title_wrap">
		<div class="left head_pic50 round_corner_circle"><a href="/userpage/<#= core.user_id#>"><img src="<#= $_.face(core.user_face, 'S2')#>" class="round_corner_3" /></a></div>
		<div class="entry_title">
			<p>
				<a href="/userpage/<#= core.user_id#>"><#= core.user_name#></a>
			</p>
			<p class="chl_name_bg">
			</p>
		</div>
		</div>
		<div class="entry clearfix">
	"""+ Template.TweetCore + Template.TweetExtend + '</div><div class="c"></div>'
)