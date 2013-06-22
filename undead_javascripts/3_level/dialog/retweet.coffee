loadit("Dialog.Retweet-tmpl",()->
  DialogTempl['retweet'] = """
<div class="dialog">
	<div class='dialog_header'>
		传阅日记
		<div class="close_dialog">
			<a href="#"  class="simplemodal-close" title="Close"></a>
		</div>
	</div>
	<div class="dialog_content width3">
		<div class="input_area_none">
			<div id="retweet_channels" class="retweet_channels clearfix">
				<span class="cGray">传阅此日记到：</span>
	      <select id="comment_retweet" class="select_cnl" ></select>
			</div>
			<textarea id="retweet_msg" data-valid="retweet"></textarea>
		</div>
		<div class="bottom clearfix">
				<a class="yes" href="javascript:void(0);">传阅</a>
				<a class="no simplemodal-close"  href="javascript:void(0);">取消</a>
		</div>
	</div>
</div>
""")