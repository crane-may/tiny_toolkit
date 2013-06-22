SYNC_NOTICE.setup_with(View.Notice);

$("#pageinate").pagination(__count , {
  	callback: function(page_index,jq){
	    if (page_index != __page ) $.jump_to_page_index(page_index);
  	},
  	current_page: __page ,
  	items_per_page: 20
});

$(".reply_btn").click(__.prevent(function(){
	var self = $(this);
	Dialog.CommonPrompt.open(null,{
		title: "回复内容:",
		default_value: "回复 @"+self.attr("data-uname")+ " : ",
		valid: "remark",
		callback: function(s) {
			$.fetch({
				type: "POST",
				url: "/messages/remark/"+self.attr("data-mid"),
				data: JSON.stringify({'content': _$.plain_html(s.val().trim())}),
				success : function(result){
					__.success("回复成功");
					$.modal.close();
				}
			});
		}
	})
}));