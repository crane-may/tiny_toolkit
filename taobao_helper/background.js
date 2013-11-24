chrome.browserAction.onClicked.addListener(function() {
  if (localStorage.getItem("taobao_helper")){
    localStorage.removeItem("taobao_helper");
    chrome.browserAction.setBadgeText({text:"off"});
  }else{
    localStorage.setItem("taobao_helper","true");
    chrome.browserAction.setBadgeText({text:"on"});
  }
});

chrome.browserAction.setBadgeText({text:localStorage.getItem("taobao_helper") ? "on" : "off"});

chrome.extension.onMessage.addListener( 
function(request, sender, sendResponse) {
  sendResponse({is_enable: localStorage.getItem("taobao_helper")}); // snub them. 
}); 