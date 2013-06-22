loadit("View.Similar-tmpl",()->
  Template.Similar = """
<# if (! core.channel_id) {#>
	<dl class="clearfix">
		<dt class="head_pic40"><a href="/userpage/<#= core.id #>"><img src="<#= $_.face(core.face, 'S1') #>"/></a></dt>
	    <dd><a href="/userpage/<#= core.id #>"><#= core.name #></a></dd>
		<dd><#= core.type == 1 ? "官方推荐": ( core.type == 2 ? "相似推荐" : "随机推荐" )  #></dd>
	</dl>
<# }else{ #>
	<dl class="clearfix">
		<dt class="head_pic40"><a href="/userpage/<#= core.id #>"><img src="<#= $_.face(core.face, 'S1') #>"/></a></dt>
	    <dd><#= core.type == 1 ? "官方推荐主题": ( core.type == 2 ? "相似推荐主题" : "随机推荐主题" )  #></dd>
		<dd><a href="/userpage/<#= core.id #>?channel=<#= core.channel_id  #>"><#= core.channel_name.channel_name() #></a></dd>
	</dl>
<# }#>
""")