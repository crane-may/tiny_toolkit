loadit("View.Tip-tmpl",()->
  Template.Tip = """
<div class="tiptip_content">
	<#= text #>
	<p class="alR"><a href="javascript:void(0);" >知道了</a></p>
</div>
<div class="tiptip_arrow_pic pic_arrow_position" style="display:none"></div>
<div class="tiptip_arrow">
	<div class="tiptip_arrow_inner"></div>
</div>
""")
