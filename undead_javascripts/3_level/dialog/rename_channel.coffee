loadit("Dialog.RenameChannel-tmpl",()->
  DialogTempl["rename_channel"] = """
<div class="dialog">
	<div class='dialog_header'>
		修改主题名称
	</div>
	<div class="dialog_content width1">
		<div class="input_area_none">
			<input type="text" class="q" style="width:344px;" data-valid="chl_name"/>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes" >保存</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")