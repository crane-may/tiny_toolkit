loadit("View.TweetTopic-tmpl",()->
  Template.TweetTopic = """
		<h3 class="entry_title">
		    <a target="_blank" class="head_pic50" href="/userpage/<#= core.user_id#>" title="<#= core.user_name#>"><img src="<#= $_.face(core.user_face, 'S2')#>" class="round_corner_circle" /></a>
		    <a target="_blank" href="<#= view.show_url #>"><#= core.channel_name.channel_name() #></a>
		    <div class="meta">
		      <a target="_blank" href="<#= view.show_url #>"><#= core.user_name#> 发表于 <#= core.msg_at.date() #></a>
		    </div>
		    <# if(core.topic_title){#>
		    <a class="topic_title font<#= core.topic_title.size_level() #>" target="_blank" href="/topics/home/<#= core.topic #>"><#= core.topic_title #></a>
		    <# } #>
		</h3>
		<div class="entry clearfix">
  <div class="msg_content_wrapper">
  <# if (core.del != 1) {#>
  	<a target="_blank" href="<#= view.show_url #>" class="msg_content clearfix"><#= _$.topic_txt(core.content) #></a>
    
    <# var s_img = _$.topic_img(core.content) #>
    <# var s_video = _$.topic_video_thumb(core.content) #>
    <# var s_xiami = _$.topic_xiami(core.content) #>
    
    <# if (s_img != "") {#>
      <a target="_blank" href="<#= view.show_url #>" style="display:block;width:100%"><#= s_img  #></a>
    <# } else if (s_video != "") { #>
      <a  target="_blank"  href="<#= view.show_url #>" style="display:block;width:100%;">
    	  <div class="video_thumb hidden" style="<#= _$.topic_video_thumb(core.content) #>">
          <img class="videoplay_btn" src="<#= window.STATIC_ROOT #>/images/videoplay.gif">
        </div>
      </a>
    <# } else if (s_xiami != "") { #>
      <#= _$.topic_xiami(core.content) #>
    <# } #>
  	
  <# } else { #>
  	<div class="del_content"><#= self.html_content() #></div>
  <# } #>
  </div>
	</div><div class="c">
"""
)