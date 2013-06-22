SYNC_NOTICE.setup_with(View.Notice);

$("#pageinate").pagination(__count , {
  	callback: function(page_index,jq){
	    if (page_index != __page ) $.jump_to_page_index(page_index);
  	},
  	current_page: __page,
  	items_per_page: 20
});