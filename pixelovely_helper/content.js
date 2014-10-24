console.log("--------");

var scs = document.getElementsByTagName("script");
for (var i = 0; i < scs.length; i++) {
  if (scs[i].innerHTML.length > 10000) {
    eval(scs[i].innerHTML.replace("jQuery(document).ready", ""));
  }
}

jQuery("#timeinterval").append('<p><input type="submit" value="猛击这里进入高级模式" class="gopro"></p>');

jQuery(".gopro").click(function () {
  if (jQuery("#clock").size() == 0) {
    jQuery("#controls")[0].innerHTML += "<p id='clock'>00:00<p>";
  }
  //Set up the image handler
  var imageHandler = new ImageHandler();

  //Load in the pictures and credits
  imageHandler.loadImageArray(pictures);
  imageHandler.loadCreditArray(credit);

  //Give the images a good shuffling to start out with
  imageHandler.shuffleImages();

  jQuery(window).bind("resize", resizeWindow);
  imageHandler.loadImageArray(gatherRelevantImages());
  imageHandler.startSession();

  jQuery("#stop img").unbind("click").click(function () {
    imageHandler.stopTimer();
    imageHandler.raiseHouseLights();
  });

  jQuery("#skipForward img").unbind("click").click(function () {
    imageHandler.skipForward();
  });

  jQuery("#skipBackward img").unbind("click").click(function () {
    imageHandler.skipBackward();
  });

  jQuery("#pause img").unbind("click").click(function () {
    imageHandler.pause();
  });

  jQuery("#play img").unbind("click").click(function () {
    imageHandler.resume();
  });

  jQuery("span.classButton").simpletip({
    onBeforeShow: function () { this.update(imageHandler.explainClass(this.getParent().find('input').val().substr(10, 1)))},
    baseClass: 'tooltip',
    fixed: true,
    position: 'top'
  });

});