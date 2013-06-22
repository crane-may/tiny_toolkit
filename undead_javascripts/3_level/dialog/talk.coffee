loadit("Dialog.Talk-tmpl",()->
  DialogTempl["talk"] = """
<div id="write_letter_dialog" class="dialog">
	<div class='dialog_header'>发悄悄话</div>
	<div class="dialog_content width2">
		<div class="input_area_none">
			<div class="new_item clearfix"><div class="tit">发悄悄话给：</div><div class="cont text_input"><input title="请输入对方的用户名" type="text" data-valid="user_name_lite" class="inputbox cGray2" /></div></div>
			<div class="new_item clearfix">
				<div class="tit">悄悄话内容：</div>
				<div class="cont"><textarea id="letter_content" data-valid="letter"></textarea></div>
			</div>
		</div>
		<div class="bottom" style="margin-top:0;">
			<p class="clearfix">
				<a class="yes" href="javascript:void(0);" data-loading="发送中...">发送</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")