loadit("Dialog.ResortChannel-tmpl",()->
  DialogTempl['resort_channel'] = """
<div class="dialog">
	<div class='dialog_header'>
		调整主题顺序
	</div>
	<div class="dialog_content" style="width:270px;">
		<div class="input_area_none">
			<p style="padding:5px;line-height:16px;">点击上下箭头调整主题的位置</p>
			<div style="height:300px;width:270px;overflow:auto;scroll-x:none;line-height:180%;border-bottom:solid 1px #ccc;position:relative">
		  	<ul class="clearfix"> 
			</ul>
			</div>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes" >保存</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")