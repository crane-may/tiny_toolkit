loadit("Dialog.PublicChannel-tmpl",()->
  DialogTempl["public_channel"] = """
<div class="dialog">
	<div class='dialog_header'>
		设为公开主题
	</div>
	<div class="dialog_content width1">
		<div class="note_area">
			<h2 class="bck_img" style="font-size:14px;">您确定要设此主题为公开主题？</h2>
      <p class="line_style"  style="padding-left:40px;">设为公开主题后，他人就可以浏览、传阅、回复、订阅此主题</p>
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