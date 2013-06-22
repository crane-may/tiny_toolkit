loadit("Dialog.ForgetPassword",()->
  DialogTempl["forget_pwd"] = """
<div class="dialog text_input">
	<div class='dialog_header'>
		重置密码
	</div>
	<div class="dialog_content width1">
		<div class="input_area_none">
			<input class="q" type="text" title="请输入您的登录邮箱地址" />
		</div>
		<div class="note_area">
       <h2><span class="notify_icon"></span>温馨小提示：</h2>
			<p class="line_style" >请输入您的注册邮箱，我们会发送一封带有重置密码链接的邮件</p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" onclick="javascript:void(0)" class="yes">重置密码</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")