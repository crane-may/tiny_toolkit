loadit("View.Remarks-tmpl",()->
  Template.remark = """
<dt class="head_pic40"><a href="/userpage/<#= core.user_id #>"><img class="round_corner_3" src="<#= $_.face(core.user_face,'S1')#>" /></a></dt>
<dd class="comment_cont">
	<a href="/userpage/<#= core.user_id #>"><#= core.user_name#></a>&nbsp;
	
	<# if (core.del != 1) {#>
		<span class="remark_content"><#= _$.letter_html(core.content)#></span>
	<# } else { #>
		<span class="del_content"><#= _$.letter_html(core.content)#></span>
	<# } #>
</dd>
<dd class="comment_operation">
	<span class="meta_comm"><#= core.msg_at.date() #></span>
	<# if(core.del != 1) {#>
		<span>
		<# if (self.is_mine() || self.collection.message.is_mine() ) {#>
		<a href="javascript:void(0)" class="del_remark confirm comment_hover_ele">删除</a>&nbsp;&nbsp;
		<# } #>
		<a href="javascript:void(0)" class="reply_remark comment_hover_ele">回复</a>
		</span>
	<# } #>
</dd>
<dd class="c"></dd>
""")