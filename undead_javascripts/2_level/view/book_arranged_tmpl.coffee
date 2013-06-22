loadit("View.BookArranged-tmpl",()->
  Template.BookArranged = """
<div class="entry">
	<div class="msg_content_wrapper">
		<div class="msg_content"><#= self.html_content() #></div>
	</div>
	<# if (core.parent) {#>
	 <div class="<#= core.parent.del != 1 ? "retweet_msg_content":"del_retweet_content" #> round_corner">
	 	<p class="mb5"><a href="/userpage/<#= core.parent.user_id #>">@<#= core.parent.user_name #></a>&nbsp;|&nbsp;<a href="/userpage/<#= core.parent.user_id#>?channel=<#= core.parent.channel_id #>"><#= core.parent.channel_name.channel_name()  #></a>：</p>
	   <# if (core.parent.del != 1 ) {#>
	   	<p ><#= _$.cccode_html(core.parent.content) #></p>
	   	<p class="byline">
	   		<span class="meta"><#= core.parent.msg_at.date() #></span>
	   		<span class="links">
	   		</span>
	   	</p>
	 	<# } else { #>
	 	  <p>此日记已被作者删除</p>
	 	<# } #>
	 </div>
	 <# } #>
	
	<div class="collapse_control hidden"><a class="open_content_btn" onclick="javascript:void(0)" >展开内容<span class="open_content" >&nbsp;</span></a></div>
	<div class="collapse_control hidden"><a class="close_content_btn" onclick="javascript:void(0)" >收起内容<span class="close_content" >&nbsp;</span></a></div>
	
	<div class="byline">
	 <span class="meta_comm left"><#= core.msg_at.date() #></span>&nbsp;
	 <a href="javascript:void(0)" class="moveup moveto">上移</a>&nbsp;
	 <a href="javascript:void(0)" class="movedown moveto">下移</a>&nbsp;
	 <a href="javascript:void(0)">导出</a>
	</div>
</div>
""")