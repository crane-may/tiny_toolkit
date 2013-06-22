loadit("Dialog.CommonConfirm",()->
  DialogTempl["common_confirm"] = """
<div class="dialog">
	<div class='dialog_header'></div>
	<div class="dialog_content width1">
		<div class="note_area"></div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes">确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")