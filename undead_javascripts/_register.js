App.setup_with(View.Register);

App.on("app_complete",function() {
	$("#email_input").autocomplete(["{}@163.com","{}@sina.com","{}@qq.com","{}@126.com","{}@hotmail.com","{}@gmail.com","{}@sohu.com","{}@yahoo.cn"], {});
})