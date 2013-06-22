loadit("Dialog.AddTags-tmpl",()->
  DialogTempl['tag'] = """
<div class="dialog" >
	<div class='dialog_header'>
		添加新标签
	</div>
	<div class="dialog_content width1">
		<div class="input_area_none">
			<input type="text" id="tag_input" class="q" data-valid="tags_name" />
		</div>
		<div class="note_area">
			<h2><span class="notify_icon"></span>温馨小提示：</h2>
			<p class="line_style" >1.标签名称长度在7个中文字符或14个字母之内</p>
			<p class="line_style" >2.标签名称可以为中文、英文、数字、"-"、"_"、"~"</p>
			<p class="line_style" >3.用逗号分隔标签名称，可同时创建多个标签</p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a class="yes" href="javascript:void(0);" >确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")