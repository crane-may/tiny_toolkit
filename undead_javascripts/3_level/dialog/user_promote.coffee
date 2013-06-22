loadit("Dialog.UserPromote_tmpl",()->
  DialogTempl["user_promote"] = """
<div class="dialog text_input">
	<div class='dialog_header'>
		<span>自我推荐</span>
	</div>
	<div class="dialog_content width1">
		<div class="note_area" style="margin-top:20px;margin-bottom:20px;">
			<p class="line_style btmlineD" style="padding-left:0;"><span class="notify_icon" style="background-position:0 -1065px;height:21px;"></span>展示你的多彩生活~分享你的兴趣爱好。如果您的日记够真实，内容够精彩。自我推荐一下吧~也许会像TA们一样受欢迎。</p>
		</div>
		<div class="input_area_none text_input" style="margin-top:0;">
			<p class="pb10 lh16"><span>推荐日记地址:</span><input type="text" class="q" title="请输入您想要推荐的自己的日记地址" autocomplete="off"/></p>	
			<p class="lh16"><span>推荐理由:</span><input type="text" class="q" title="请输入自我推荐的理由" autocomplete="off"/></p>
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