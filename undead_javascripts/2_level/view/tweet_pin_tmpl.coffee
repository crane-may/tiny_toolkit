loadit("View.TweetPin-tmpl",()->
  Template.TweetPin = """
<div class="col_pic">
	<img src="<#= $_.image(core.user_face,'L3') #>" class="col_hover" />
	<p class="col_info hidden">
		<span class="f18px lh180 fB"><#= core.user_name #></span><br/>
		<span class="lh180 cGray"><#= core.channel_name.channel_name() #></span>
	</p>
</div>
<div class="col_text">
	<#= core.content #>
</div>
""")
