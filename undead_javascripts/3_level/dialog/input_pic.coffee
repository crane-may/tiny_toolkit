loadit("Dialog.Input-pic_tmpl",()->
  DialogTempl["input_pic"] = """

<div class="dialog">
	<div class='dialog_header'>添加图片</div>
	<div class="dialog_content width1">
		<div class="input_area_none">
      		<form enctype="multipart/form-data" method="post" style="overflow:hidden;width:90px;height:36px;margin-top:0px;float:left;">
				<div class="image_uploader_load" style="height:30px;line-height:30px;color:#ccc">加载中...</div>
				<div id="image_uploader" class="image_uploader"></div>
			</form>
			<span class="hidden clearfix loading_span">
				<img class="left" src="<#= $_.static_url("images/loading_16.gif") #>" style="margin-top:7px;" />
				<span class="cGray2 left" style="line-height:30px;height:30px;width:50px;display:block;">上传中...</span>
			</span>
			<div class="c"></div>	
			<p class="cGray2" style="height:12px;line-height:12px;padding:5px 0;">支持JPG、JPEG、GIF、BMP和PNG文件，单张最大不超过4M</p>
			<div class="thumb_list clearfix" id="thumb_list">
				<ul>
				</ul>
			</div>
		</div>
		<div class="bottom">
			<p class="clearfix">
				<a class="yes" >保存</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")