chrome.extension.sendMessage(null,{is_enable: "?"}, function(response) { 
  if (response.is_enable){
    var style = document.getElementsByClassName("shop-hesper-bd")[0].style;
    style.width = "100%";
    style.height = "100%";
    style.position = "fixed";
    style.left = "0";
    style.top = "0";
    style["background-color"] = "#fff";
    style["z-index"] = "99999";
    window.scrollTo(0,100000)

    document.getElementsByTagName("body")[0].addEventListener("keydown",function(e){
      if (e.keyCode == 39 && document.getElementsByClassName("next").length > 0) {
        window.location.href = document.getElementsByClassName("next")[0].getAttribute("href");
      }else if (e.keyCode == 37 && document.getElementsByClassName("prev").length > 0){
        window.location.href = document.getElementsByClassName("prev")[0].getAttribute("href");
      }
    })
  }
}); 