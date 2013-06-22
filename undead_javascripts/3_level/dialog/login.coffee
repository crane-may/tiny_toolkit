loadit("Dialog.Login-tmpl",()->
  DialogTempl["login"] = """
<div class="dialog text_input">
	<div class='dialog_header'><span >登录</span></div>
	<div class="dialog_content" style="width:322px">
		<div class="input_area_none text_input">
			<div class="new_item clearfix" style="height:41px;margin:0;">
				<div class="tit" style="width:50px" >邮箱：</div>
				<div class="cont" style="width:260px"><input type="text" id="guest_email" class="inputbox"  value=""  autocomplete="off" /></div>
			</div>
			<div class="new_item clearfix" style="height:41px;margin:0;">
				<div class="tit" style="width:50px">密码：</div>
				<div class="cont" style="width:260px"><input type="password" id="guest_pwd" class="inputbox" value="" autocomplete="off"/></div>
			</div>
			<div  class="new_item clearfix alR" style="padding-top:10px;margin:0;">
				<div class="tit" style="width:50px;height:16px;line-height:16px;">&nbsp;</div>
				<div class="cont" style="width:260px;text-align:right;height:16px;line-height:16px;">
					<input type="checkbox" id="login_remember_me" class="remember_me" name="user[remember_me]" value="1" checked="checked" /> 
					<span class="left cGray2 lh14">&nbsp;两周内自动登录</span>
					<a href="/register">还没有帐号？立即注册</a>
				</div>
			</div>
		</div>
		<div class="c"></div>
		<div class="bottom">
			<p class="clearfix">
				<a href="javascript:void(0);" class="yes" name="submit" data-loading="登录中...">登录</a>
				<a class="no simplemodal-close" href="#">取消</a>
			</p>
		</div>
	</div>
</div>
""")