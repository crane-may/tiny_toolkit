App.setup_with(View.Login);

if (window.__error) {
	$(".error_tip").html(__error.replace(/^::/g,"")).removeClass("hidden");
}

App.on("app_complete",function() {
	$("#login_account").autocomplete(["{}@163.com","{}@sina.com","{}@qq.com","{}@126.com","{}@hotmail.com","{}@gmail.com","{}@sohu.com","{}@yahoo.cn"], {});
})