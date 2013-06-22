loadit("!validoption",function(){
window.ValidOption = {};

ValidOption["chl_name"] = {
// /^[^\u0000-\u002c\u002e-\u002f\u003a-\u0040\u005b-\u0060\u007b-\u007d\u007f\u008f]+$/gi;
 	regex : /^[a-z0-9A-Z \u4e00-\u9fa5~_-]+$/i,
	max 	: 14,
	min 	: 1,
	info 	: '主题名只能输入中英文、数字、空格和"-","_","~"',
	label : '主题名'
};

ValidOption["user_name"] = {
	regex : /^[a-z0-9A-Z\u4e00-\u9fa5~_-]+$/i,
	max 	: 14,
	min 	: 3,
	info 	: '用户名只能输入中英文、数字和"-","_","~"',
	label : '用户名'
};

ValidOption["user_name_lite"] = {
	regex : /^[^;<>%$'"]+$/i,
	max 	: 14,
	min 	: 3,
	info 	: '用户名只能输入中英文、数字和"-","_","~"',
	label : '用户名'
};

ValidOption["tag_name"] = {
	regex : /^[a-z0-9A-Z\u4e00-\u9fa5~_-]+$/i,
	max 	: 14,
	min 	: 2,
	info 	: '标签只能输入中英文、数字和"-","_","~"',
	label : '标签'
};

ValidOption["tags_name"] = {
	regex : /^[a-z0-9A-Z\u4e00-\u9fa5~_,，-]+$/i,
	max 	: 140,
	min 	: 2,
	info 	: '每个标签只能是中英文、数字和"-","_","~"',
	label : '标签'
};

ValidOption["email"] = {
// /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
	regex : /^(\w)+([.-]\w+)*@(\w)+(([.-]\w{2,10}){1,5})$/,
	max 	: 500,
	min 	: 0,
	info 	: "请输入正确格式的邮箱，例:123@qq.com",
	label	:  "邮箱",
	not_unicode : true
};

ValidOption["pwd"] = {
	regex	: /^.*$/i,
	max		: 40,
	min		: 6,
	info	: "密码不能包括中文",
	label	: "密码",
	not_unicode : true
};

ValidOption["pwd_confirm"] = {
	regex	: /^.*$/i,
	max		: 40,
	min		: 0,
	info	: "密码不能包括中文",
	label	: "密码",
	not_unicode : true
};

ValidOption["captcha"] = {
	regex : /^....$/i,
	max 	: 4,
	min		: 4,
	info	: "请填写正确的4位验证码",
	label	: "验证码",
	not_unicode : true,
	prior_regex : true	
};

ValidOption["intro"] = {
	regex : /.*/i,
	max 	: 280,
	min 	: 0,
	info 	: '',
	label : "一句话介绍"
};

ValidOption["retweet"] = {
	regex : /.*/i,
	max 	: 2000,
	min 	: 0,
	info 	: '',
	label : "转发内容"
};

ValidOption["remark"] = {
	regex : /.*/i,
	max 	: 2000,
	min 	: 0,
	info 	: '',
	label : "回复内容",
	not_empty : true
};

ValidOption["letter"] = {
	regex : /.*/i,
	max 	: 2000,
	min 	: 0,
	info 	: '',
	label : "悄悄话内容",
	not_empty : true
};

ValidOption["domain_name"] = {
	regex	: /^[a-z][a-z0-9_-]*$/i,
	max		: 20,
	min		: 4,
	info	: '个性域名要以英文字母开头，且只能包含英文字母、数字、"_"、"-"',
	label	: '个性域名',
	not_unicode : true
};

ValidOption["menu"] = {
	regex : /^.+$/i,
	max 	: 14,
	min 	: 1,
	info 	: '目录名只能输入中英文和符号',
	label : '目录名',
	chs_len1 : true
};

});//end of loadit