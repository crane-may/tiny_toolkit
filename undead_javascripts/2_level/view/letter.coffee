loadit("View.Letter-tmpl",()->
  Template.Letter = """
<div class="letter_content_wrap clearfix">
	<div class="letter_content round_corner_3 boxshadowN clearfix">
		<p class="letter_content_detail">
			<a href="/userpage/<#= core.active_id #>" class="wn" ><#= core.active_name #>:</a>
			&nbsp;&nbsp;<#= self.letter_content() #>
		</p>
		<p class="reply clearfix">
		<span class="left cGray2"><#= core.at.date() #></span>
		<# if (! self.is_mine()) {#>
			<a href="javascript:void(0);" class="letter_reply_btn">回复</a>
		<#}#>
		&nbsp;<a href="javascript:void(0)" class="confirm">删除</a>
		</p>
	</div>
</div>
<div class="head_pic60_frame round_corner_3" ><a href="/userpage/<#= core.active_id #>" ><img src="<#= $_.face(core.active_face, 'S2')#>" /></a></div>
<# if (self.is_mine()) {#>
<div class="letter_dialog_corner_right"></div>
<# } else {#>
<div class="letter_dialog_corner_left"></div>
<# }#>
""")