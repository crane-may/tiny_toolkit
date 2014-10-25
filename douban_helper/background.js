chrome.browserAction.onClicked.addListener(function() {
  if (localStorage.getItem("douban_helper")){
    localStorage.removeItem("douban_helper");
    chrome.browserAction.setBadgeText({text:"off"});
  }else{
    localStorage.setItem("douban_helper","true");
    chrome.browserAction.setBadgeText({text:"on"});
  }
});

chrome.browserAction.setBadgeText({text:localStorage.getItem("douban_helper") ? "on" : "off"});

chrome.extension.onMessage.addListener( 
function(request, sender, sendResponse) {
  sendResponse({is_enable: localStorage.getItem("douban_helper")}); // snub them. 
}); 