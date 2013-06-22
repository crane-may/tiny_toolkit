loadit("Dialog.CreateChannel-tmpl",()->
  DialogTempl['create_channel'] = """
<div class="dialog text_input">
	<div class='dialog_header'>
		创建新主题
	</div>
	<div class="dialog_content width1">
		<div class="input_area">
			<p style="padding:5px 0;">
				主题名称：<input type="text" id="cnl_name" class="q" name="cnl_name" data-valid="chl_name" style="width:260px" autocomplete="off"/>
			</p>
			<p style="padding:5px 0;line-height:14px;">主题类型：
					<input id="new_public_cnl" type="radio" name="chl_type" value="1" checked="true" autocomplete="off"/>
					<span class="for_new_public_cnl" style="cursor:pointer;">公开主题</span> &nbsp;&nbsp;&nbsp;&nbsp; 
					<input id="new_private_cnl" type="radio" name="chl_type" value="2" autocomplete="off"/>
					<span class="for_new_private_cnl" style="cursor:pointer;">隐私主题</span>
			<p>
		</div>
		<div class="note_area">
			<h2><span class="notify_icon"></span>温馨小提示：</h2>
			<ul>
				<p class="line_style">1.主题名称长度在7个中文字符或14个字母之内</p>
				<p class="line_style">2.主题名称可以为中文、英文、数字、"-"、"_"、"~"</p>
				<p class="line_style">3.主题设为隐私主题后，他人将不能浏览、传阅、回复此主题</p>
			</ul>
			
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a id="create_cnl_submit" class="yes" href="javascript:void(0);">确定</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")