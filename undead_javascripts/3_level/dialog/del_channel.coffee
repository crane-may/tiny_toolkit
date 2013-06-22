loadit("Dialog.DelChannel-tmpl",()->
  DialogTempl["del_channel"] = """
<div class="dialog">
	<div class='dialog_header'>
		删除日记主题
	</div>
	<div class="dialog_content width1">
		<div class="note_area">
			<h2 class="bck_img" style="font-size:14px;">您确定要删除这个日记主题吗？</h2>
            <p class="line_style" style="padding-left:40px;">删除主题后，此主题的日记，以及订阅的与被订阅的主题都会被清除掉～～</p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a class="yes" href="javascript:void(0);">确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")