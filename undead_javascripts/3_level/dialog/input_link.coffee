loadit("Dialog.Input-link_tmpl",()->
  DialogTempl["input_link"] = """
<div class="dialog text_input">
	<div class='dialog_header'>
		<span>添加链接</span>
	</div>
	<div class="dialog_content width1">
		<div class="input_area_none text_input">
			<p class="pb10 lh16"><span>链接地址:</span><input type="text" class="q" title="请输入您想要链接的网址" autocomplete="off"/></p>			
			<p class="lh16"><span>链接文字:</span><input type="text" class="q" title="请输入您对此网址的描述" autocomplete="off"/></p>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes" name="submit">确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")