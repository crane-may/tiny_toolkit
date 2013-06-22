SYNC_NOTICE.setup_with(View.Notice);$.scrollTo(0,0);

var letters = __letters.setup_with(View.Letters);
var letter_box = $("#write_letter").valid_view(Valid.Base);

$("#letter_edit_panel").smile_dropdown($("#write_letter"),true);

var send_btn = $(".send_btn");
send_btn.click(__.prevent(
	__.lock({
		handler: function() {
			send_btn.loading_mask();
			ValidCenter({
				valid: letter_box,
				callback: function() {
					$.fetch({
						type:"POST",
						url:"/letters/talk/"+__other_id,
						data:JSON.stringify({"content":_.escape(letter_box.val())}),
						success:function(){
							__.success("发送成功");
							letter_box.val("");

							$("#pageinate").trigger('setPage', [0]);
						},
						lock: "letter"
					});
				},
				lock: "letter"
			})
		},
		lock: "letter",
		unlock: function() {
			send_btn.loading_mask_recover();
		}
	})
))