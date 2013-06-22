loadit("Dialog.PrivateChannel-tmpl",()->
  DialogTempl["private_channel"] = """
<div class="dialog">
	<div class='dialog_header'>
		设为隐私主题
	</div>
	<div class="dialog_content width1">
		<div class="note_area">
			<h2 class="bck_img" style="font-size:14px;">您确定要设置此主题为隐私主题？</h2>
			<p class="line_style"  style="padding-left:40px;">设为隐私主题后</p>
            <p class="line_style"  style="padding-left:40px;">1. 他人将不能浏览、传阅、回复、订阅此主题</p>
			<p class="line_style"  style="padding-left:40px;">2. 您可以发送邀请链接邀请他人订阅您的隐私主题</p>
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