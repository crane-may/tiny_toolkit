loadit("View.Selections",function(){
View.Selections = View.Base.extend({
	el: $("#page_content"),
	initialize:function(){
	},
	render:function(){
		this.$("#level1_ul").append( _(this.selections).reduce(function(memo,i){
			var lid = i.id;
			var lname = i.name;
			var tar = $('<li id="level1_li_'+lid+'"><a href="javascript:void(0);" class="'+
									(lid == "all" ? "hot_cata" : "hot_cata_child")+'">'+
									(lid == "all" ? "" : "•&nbsp;&nbsp;")+lname+'</a></li>' );
			App.on("change:current_selection",function(m,lid_){
				if (lid_ == lid){
					tar.addClass("on");
				}else{
					tar.removeClass("on");
				}
			});
			tar.click(__.prevent(function(){
				App.set("current_selection",lid);
				App.set("current_selection_name",lname);
			}));
			return memo.add(tar);
		},$(),this) );
	}
})
});//end of loadit
