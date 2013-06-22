loadit("View.BookWillArranged-tmpl",()->
  Template.BookWillArranged = """
<p><#= self.txt_content().ntop(200) #></p>
<# if (core.parent) {#>
//&nbsp;<a href="/u/<#= core.parent.user_id #>"><#= core.parent.user_name #></a>&nbsp;|&nbsp;
<a href="/u/<#= core.parent.user_id #>?channel=<#= core.parent.channel_id #>"><#=core.parent.channel_name.channel_name() #></a>&nbsp;:
<#= _$.cccode_txt(core.parent.content).ntop(100) #>
<# }#>
<p class="meta_comm cGray2 alR"><span class="left"><#= core.msg_at.date() #></span><a href="javascript:void(0)">导入</a></p>
""")