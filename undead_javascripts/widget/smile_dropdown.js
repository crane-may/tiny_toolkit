loadit("smile_dropdown",function(){
var smiles_name = [
  ["⊙﹏⊙b","冷汗",], ["~(@^_^@)~","害羞"], ["（ˉ﹃ˉ）","犯困"], ["(ㄒoㄒ)","流泪"], ["(╰_╯)# ","发怒"], ["(@﹏@)~","狂晕"],
  ["(╯﹏╰)b","委屈"], ["(⊙_⊙?)","疑问"], ["(ˇ__ˇ)","思考"], ["(#‵′)凸","鄙视" ], ["o(>﹏<)o","抓狂"], [ "O(∩_∩)O","微笑" ],
  ["(*^◎^*)","开心"], ["o(≧v≦)o","激动" ], ["╭(╯^╰)╮","哼" ], ["↖(^ω^)↗","加油"], ["o(︶︿︶)o","无奈"], ["<(￣︶￣)>","得意" ],
  ["（＞﹏＜）","忍耐" ], ["╮(╯_╰)╭","无所谓"],  ["（￣Ｑ￣）╯","不理你" ], ["╰（‵□′）╯","愤怒"], ["[]~(￣▽￣)~*","干杯"], ["(づ￣ 3￣)づ","亲亲"],
  ["＼（￣︶￣）／","抱抱" ], ["〈（＿　＿）〉","道歉"], [" ( ⊙ o ⊙ )！","惊讶"], ["(￣o￣) . z Z","睡着了"],  ["（￣ c￣）y▂ξ","抽烟" ], ["Σ( ° △ °|||)|","惊吓"]
];

$.fn.smile_dropdown = function(jq_obj,is_smile_icon_long,autoheight_view_){	
	return this.each(function(){
		var autoheight_view = autoheight_view_;
		if ($(this).find("dl").length > 0) return;
		
		var _jq_obj = jq_obj;
		var self = $(this);
		
		var dl = $('<dl class="smile_dropdown left">'+
					      '<dt><a href="javascript:void(0)" class="'+(is_smile_icon_long ? 'smile_icon_long' : 'smile_icon')+ '"></a></dt>'+
					      '<dd><div class="smile_panel round_corner" style="display:none;"><ul class="smile_panel_ul">'+
					      '</ul></div></dd>'+
    					'</dl>');
		
		var toggler = new ___.DocClickCloseToggler({
			toggle_handler: function() {
				self.find("dd div").toggle();
			},
			close_handler: function(e) {
				self.find("dd div").hide();
			},
			toggle_element: dl.find("dt a"),
			stopPropagation_element: self
		});
		
		
		dl.find("ul").append(_(_.reject(_.range(30),function(i){return i==13 || i==21;})).reduce(function(memo,i){
			return memo.add(
				$('<li><a href="javascript:void(0)" style="background-position:0 -'+(i*25)+'px;" title="'+smiles_name[i][1]+'"></a></li>')
					.click(__.prevent(function(){
						_jq_obj.insertAtSmile(smiles_name[i][0]);
						if (autoheight_view) autoheight_view.on_change();
						toggler.close();
					}))
			);
		},$()));
		$(this).append(dl);
		
	});
}

$.fn.insertAtSmile = function(myValue) {
	var myField = $(this)[0];
  //IE support
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
    sel.select();
  }
  //MOZILLA/NETSCAPE support
  else if (myField.selectionStart || myField.selectionStart == '0') {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    // save scrollTop before insert
    var restoreTop = myField.scrollTop;
    myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
    if (restoreTop > 0) {
      // restore previous scrollTop
      myField.scrollTop = restoreTop;
    }
    myField.focus();
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
    myField.focus();
  }
}


});//end of loadit