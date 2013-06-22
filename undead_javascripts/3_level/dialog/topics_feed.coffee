loadit("Dialog.TopicsFeed-tmpl",()->
  DialogTempl["topics_feed"] = """
<div id="write_letter_dialog" class="dialog">
	<div class='dialog_header'>投稿</div>
	<div class="dialog_content width1">
		<div class="input_area_none">
			<p class="pb10 lh16">请输入您的iBooloo日记链接地址：（<a href="http://www.ibooloo.com/messages/show/4368025" target="_blank">什么是日记链接地址？</a>）</p>
            <input class="q" type="text" autocomplete="off" id="feed_input" title="请输入您想要链接的网址">
		</div>
		<div class="bottom" style="margin-top:0;">
			<p class="clearfix">
				<a class="yes" href="javascript:void(0);" data-loading="发送中...">投递</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")