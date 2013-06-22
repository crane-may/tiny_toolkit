loadit("Dialog.Input-music_tmpl",()->
  DialogTempl["input_music"] = """
<div class="dialog text_input">
	<div class='dialog_header'>
		添加音乐
	</div>
	<div class="follow_menu">
  	<ul class="clearfix">
    	<li><a class="on" href="javascript:void(0);" >添加虾米链接</a></li>
      <li><a class="" href="javascript:void(0);" >添加mp3链接</a></li>
    </ul>
  </div>
	<div id="insert_xiami" class="dialog_content width1">
		<div class="input_area_none">
			<input type="text" class="q" title="请输入虾米播放器链接(.swf链接)" />
		</div>
		<div class="note_area">
			<p><a href="/messages/show/17579" target="_blank">如何添加音乐？</a></p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes">确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
	<div id="insert_mp3" class="dialog_content width1 hidden">
		<div class="input_area_none">
			<input type="text" class="q" title="请输入mp3链接(.mp3链接)" />
		</div>
		<div class="note_area">
			<p><a href="/messages/show/17579" target="_blank">如何添加音乐？</a></p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes">确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")