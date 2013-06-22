window.adjust_time = 0;

function adjust() {
  adjust_time += 1;
  var col1 = $(".col:eq(0)");
  var col2 = $(".col:eq(1)");
  if (col1.height() > col2.height()){
    var coll = col1, cols = col2;
  }else{
    var coll = col2, cols = col1;
  }
  var last_one = coll.find(".unit_wrap:last");
  if (coll.height() - last_one.height() > cols.height() ){
    cols.append(last_one.remove());
    if (adjust_time < 10){
      setTimeout(function(){adjust()},50);
      return;
    }
  }
  
  $(".like_btn").each(function() {
    var ob = new Mod.Tweet({id: $(this).data('mid')});
    ob.setup_at(Widget.LikeSingleButton,$(this),{
      is_liked: ($(this).data('is_like') == "1"),
      clike: parseInt($(this).data("clike"))
    });
  });
}

setTimeout(function() {
  adjust();
},100);
