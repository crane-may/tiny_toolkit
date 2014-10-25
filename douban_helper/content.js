chrome.extension.sendMessage(null,{is_enable: "?"}, function(response) { 
  if (response.is_enable){
    var eles = document.getElementsByClassName("commodity-block");
    for (var i = 0; i < eles.length; i++) {
      eles[i].parentNode.parentNode.parentNode.hidden = true
    }
    
    var eles = document.getElementsByClassName("commodity-doulist-block");
    for (var i = 0; i < eles.length; i++) {
      eles[i].parentNode.parentNode.parentNode.hidden = true
    }
  }
}); 