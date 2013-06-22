loadit("Dialog.Input-video-tmpl",()->
  DialogTempl["input_video"] = """
<div class="dialog text_input">
	<div class='dialog_header'>
		添加视频
	</div>
	<div class="dialog_content width1">
		<div class="input_area_none">
			<input type="text" class="q" title="请输入视频播放页地址"/>
		</div>
		<div class="note_area">
			<h2><span class="notify_icon"></span>温馨小提示：</h2>
			<p class="line_style" >目前支持：优酷网，土豆网，酷6网，56网，音悦台的视频链接</p>
			<p class="line_style" >另外支持新浪视频的flash链接地址(.swf链接)</p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes" name="submit" data-loading="上传中...">确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")