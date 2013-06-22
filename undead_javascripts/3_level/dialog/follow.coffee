loadit("Dialog.Follow-tmpl",()->
  DialogTempl["follow"] = """
<div id="follow_cnl_dialog" class="dialog">
	<div class='dialog_header'>订阅</div>
	<div class="dialog_content width5">
		<div class="input_area">
			<p id="follow_to_p" class="lh28" style="padding:5px 0;">
				<span>订阅到：</span>
				<select class="select_cnl">
				</select>
			</p>
		</div>
		<div class="note_area">
			<h2><span class="notify_icon"></span>温馨小提示：</h2>
			<p class="line_style" >订阅此主题后，您会收到此主题的更新</p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes">确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")