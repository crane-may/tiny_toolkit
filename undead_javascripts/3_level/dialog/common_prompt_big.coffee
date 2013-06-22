loadit("Dialog.CommonPromptBig-tmpl",()->
  DialogTempl["common_prompt_big"] = """
<div class="dialog text_input">
	<div class='dialog_header'>
		<span></span>
	</div>
	<div class="dialog_content width1">
		<div class="note_area" style="margin-top:20px;margin-bottom:20px;">
			<p class="line_style btmlineD" style="padding-left:0;"><span class="notify_icon" style="background-position:0 -1065px;height:21px;"></span>请您留下您的常用邮箱，稍后工作人员会把安装包通过邮件发送给您</p>
		</div>
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