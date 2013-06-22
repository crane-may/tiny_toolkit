loadit("Dialog.CommonPrompt-tmpl",()->
  DialogTempl["common_prompt"] = """
<div class="dialog text_input">
	<div class='dialog_header'>
		<span></span>
	</div>
	<div class="dialog_content width1">
		<div class="input_area_none">
			<p class="f14px"><input type="text" class="q" value="" style="width:344px" /></p>
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