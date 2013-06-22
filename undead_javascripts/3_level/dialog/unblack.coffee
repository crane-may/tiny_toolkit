loadit("Dialog.Unblack-tmpl",()->
  DialogTempl["unblack"] = """
<div class="dialog">
	<div class='dialog_header'>拉出黑名单</div>
	<div class="dialog_content width1">
		<div class="note_area">
			<h2 class="bck_img" style="font-size:14px;">您确定要把TA拉出黑名单吗？</h2>
      <p class="line_style" style="padding-left:40px;">这样TA就可以关注您的任何主题，发悄悄话给您，也可以回复和传阅您的节目～～</p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a id="unblack_submit" class="yes" href="javascript:void(0)">确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")