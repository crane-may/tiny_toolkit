loadit("Dialog.Invitation-tmpl",()->
  DialogTempl["invitation"] = """
<div class="dialog text_input">
	<div class='dialog_header'>邀请链接</div>
	<div class="dialog_content width3">
		<div class="input_area_none">
			<p class="alL" style="padding:10px 0;line-height:16px;">此链接可邀请他人看到您的隐私主题（一次有效）</p>
			<p><input type="text" id="invitation_code" class="q" value="" readonly="ture" style="width:456px;" data-valid="letter"/></p>
			<p class="alL" style="padding:10px 0;line-height:16px;"><strong>直接通过悄悄话发送:</strong></p>
			<p><span>发送给：&nbsp;&nbsp;</span><input type="text" id="letter_name" class="q cGray2" title="请输入对方的用户名" data-valid="user_name"/></p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes">发送</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")