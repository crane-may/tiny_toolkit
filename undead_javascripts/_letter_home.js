SYNC_NOTICE.setup_with(View.Notice);

HTML5History.bind(window.history);
App.url_event("letter_entry");

$(".write_letter_btn").click(__.prevent(function() {
	Dialog.Talk.open(null,{
		on_showed: function() {
			$.fetch({
				url:"/users/friends",
				type: "GET",
				cache: true,
				context: this,
				success: function (result) {
					this.input_name_jq.autocomplete(result, {});
				}
			})
		}
	});
}));

if (! __.ie6) $("#letter_edit_panel").smile_dropdown($("#write_letter"),true);


var __homeletters = new Mod.HomeLetters();
var homeletters_view = __homeletters.setup_with(View.HomeLetters);

var __letters = new Mod.Letters();
var letters_view = __letters.setup_with(View.Letters);

var last_uid = -1;
function letter_entry_to (uid) {
	if (uid == last_uid) return;
	last_uid = uid;
	$(".home_entry,.letter_entry").removeClass("on");
	if (uid) {
		$("#letter_session").removeClass("hidden");
		$("#all_letters_wrapper").addClass("hidden");
		letters_view.init(uid);
		$(".letter_entry[data-uid="+uid+"]").addClass("on");
	}else{
		$("#letter_session").addClass("hidden");
		$("#all_letters_wrapper").removeClass("hidden");
		homeletters_view.init();		
		$(".home_entry").addClass("on");
	}
}

$(".letter_entry").click(__.prevent(function() {
	App.trigger("letter_entry",$(this).data("uid"));
}))
$(".home_entry").click(__.prevent(function() {
	App.trigger("letter_entry");
}))

App.on("letter_entry",letter_entry_to);
var ms = window.location.hash.match("#!/letter_entry/(.+)");
letter_entry_to(ms ? ms[1] : null);