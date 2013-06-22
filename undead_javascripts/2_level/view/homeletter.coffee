loadit("View.HomeLetter-tmpl",()->
  Template.HomeLetter = """
<dt class="head_pic60 round_corner_3"><a href="/userpage/<#= core.other_id #>"><img src="<#= $_.face(core.face, 'S2')#>" /></a></dt>
<dd>
  <# if (core.active_id == CURRENT_USER_ID) {#>
  我对&nbsp;<a href="/userpage/<#= core.other_id #>" ><#= core.other_name #></a>&nbsp;说:&nbsp;&nbsp;
  <#} else {#>
  <a href="/userpage/<#= core.other_id #>" ><#= core.other_name #></a>&nbsp;对我说:&nbsp;&nbsp;
  <# } #>
	<span><#= self.letter_plain() #></span>
</dd>
<dd class="alR">
  <span class="left cGray2"><#= core.at.date() #></span>
  <span class="links">
  <a class="del_btn" href="javascript:void(0)" class="confirm" >删除会话</a>
  </span>
</dd>
""")
