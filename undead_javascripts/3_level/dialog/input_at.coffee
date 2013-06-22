loadit("Dialog.Input-at_tmpl",()->
  DialogTempl["input_at"] = """
<div id="at_dialog" class="dialog text_input">
	<div class='dialog_header'>
		<span >请输入提到人的名字:</span>
	</div>
	<div class="dialog_content width1">
		<div class="input_area_none">
			<p class="f14px">@&nbsp;<input type="text" class="q" style="width:300px" title="请输入您想提到的人" data-valid="user_name"/></p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes" name="submit">确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")