function ImageHandler() {	
	//Set up for the image handler
	var obj = this;
	var timeInterval = 30000; //default is 30 second intervals
	var imagePointer = 0; //represents where we are in the array.
	var mode = 'standard';
	var pictures = new Array();
	var credit = new Array();
	var preferences = new Array();
	var allimages = 0;
	var imagePath = "http://www.artists.pixelovely.com/";
	var timerStartedAt = 0;
	var timeRemaining = 0;
	var lastImage = 0;
	var paused = 0;
	
	var classes = new Array();
	classes["A"] = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 60, 60, 60, 60, 345, 345, 690]; //30 minute trainer 
	classes["B"] = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 60, 60, 60, 60, 345, 345, 690, "shortbreak", 1800]; // Hour long class. 30 minute trainer warmup, followed by a half hour pose
	classes["C"] = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 60, 60, 60, 60, 345, 345, 690, 1800, "shortbreak", 3600]; //Two hour class
	classes["D"] = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 60, 60, 60, 60, 345, 345, 690, "shortbreak", 1800, 1800, "longbreak", 1800, 3600]; //Three hour class. 30 minute warmup, short break, two half hour poses, break. One half hour pose, one hour long pose 
	classes["E"] = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 60, 60, 60, 60, 345, 345, 690, "shortbreak", 1800, 1800, "shortbreak", 1800, 3600, "longbreak", 3600, "shortbreak", 7200]; //Six hour class. 30 minute warmup, short break. Two half hours poses, short break. Half hour pose, hour long pose, long break. This is the half point 3 hour mark. Hour long pose, short break, two hour long pose.
	classes["F"] = [5, 5, "shortbreak", 5, 5, "longbreak", 10]; //Test class
	
	var classSelection = "A";
	var classPointer = 0;
	
	this.explainClass = function(classID) {
		var lastLength = 0;
		var howMany = 0;
		var string = "<ul>";
		var length = 0;
		for (i=0; i <= classes[classID].length; i++)
		  {
			length = classes[classID][i];
			if (length != lastLength) {
				if (lastLength != 0 && length != 0) {
					string = string + "<li>";
					if (lastLength == "shortbreak") {
						string = string + "Short Break";
					} else if (lastLength == "longbreak") {
						string = string + "Long Break";
					}else {
						string = string + howMany + " pose";
						if (howMany > 1) {
							string = string + "s";
						}
						string = string + ", " + this.timeCounter(lastLength);
					}
					string = string + "</li>";
				}
				howMany = 1;
			} else {
				howMany++;
			}
			lastLength = length;
		  }
		return string;
	}
	
	//THIS MUST BE CALLED before anything else happens
	this.loadImageArray = function(array) {
		pictures = array;
		allimages = pictures.length;
	}
	
	this.loadCreditArray = function(array) {
		credit = array;
	}
	
	this.startTimer = function(timerInterval) {
		//timeInterval should be given in seconds
		timer = window.setTimeout(obj.nextStep, (timerInterval * 1000));
    if (window['clock']) {
      window.clearInterval(window['clock']);
    }
    window.clock_remain = timerInterval;
    window.clock = window.setInterval(obj.clock, 1000);
    
		timerStartedAt = Math.round(+new Date()/1000);
		timeRemaining = timerInterval;
	}
  
  this.clock = function () {
    window.clock_remain -= 1;
    var h = Math.floor(window.clock_remain / 60);
    var m = window.clock_remain % 60;
    jQuery("#clock").html((h > 9 ? ""+h:"0"+h) +":"+ (m > 9 ? ""+m:"0"+m));
  }

	this.stopTimer = function() {
		window.clearTimeout(timer);
    window.clearInterval(window.clock);
	}
	
	this.setTimerInterval = function(interval) {
		timeInterval = interval;
	}
	
	this.showTime = function (timeToDraw) {
		jQuery("#showTime").stop().hide();
			
		jQuery("#showTime").html(obj.timeCounter(timeToDraw));

		
		jQuery("#showTime").fadeTo(400, 1, function() {
			jQuery("#showTime").fadeOut(3000);    	
		});
			
	}

	this.pause = function () {
		var timerStoppedAt = Math.round(+new Date()/1000);
		timeRemaining = timeRemaining-(timerStoppedAt-timerStartedAt);
		obj.stopTimer();
		jQuery("#showTime").stop().hide();
		
		jQuery("#showTime").html("Paused");

	
		jQuery("#showTime").fadeTo(400, 1);
		jQuery("#pause").hide();
		jQuery("#skipBackward img").hide();
		jQuery("#skipForward img").hide();
		jQuery("#play").show();
		paused = 1;
	}

	this.resume = function() {
		obj.startTimer(timeRemaining);
		obj.showTime(timeRemaining);
		jQuery("#play").hide();
		jQuery("#skipBackward img").show();
		jQuery("#skipForward img").show();
		jQuery("#pause").show();
		paused = 0;
	}
	
	this.timeCounter = function (t) {
		var days = parseInt(t/86400);
		t = t-(days*86400);
		var hours = parseInt(t/3600);
		t = t-(hours*3600);
		var minutes = parseInt(t/60);
		t = t-(minutes*60);
		var content = "";
		if(days)content+=days+" days";
		if(hours||days){ if(content)content+=", "; content+=hours+" hours"; }
		if (minutes == 0) {
			if (t > 0) {
				content+=" " +t+" seconds";
			}
		} else if (minutes == 1 && ((t%60) == 0)) {
			content+=minutes+" minute";
		}else if (minutes > 0 && ((t%60) == 0)) {
			content+=minutes+" minutes";
		} else {
			if (content) { content+=", ";} 
			content+=minutes+" minutes and "+t+" seconds";
		}
		return content;
	}

	this.takeBreak = function (breakLength) {
		jQuery("#drawme").fadeOut(300, function() {
			if (breakLength == "shortbreak") {
				jQuery("#drawme").html("<h2>Short Break</h2><p>Get up and stretch, have a drink of water, or get yourself a snack.</p><p>Try not to take more than ten or fifteen minutes, so you don't lose your flow.</p><p>When you're ready to continue, come back and press the go button!</p><p><div id='backFromBreak'><img src='http://artists.pixelovely.com/wordpress/wp-content/themes/drawing-child/images/tools/play.png'></div></p>");		
			} else {
				jQuery("#drawme").html("<h2>Lunch</h2><p>You've been drawing for a long time, and you've got a lot of drawing ahead of you!</p><p>Take a break, use the restroom, have something to eat, and stretch your hands.</p><p>When you're ready to continue, come back and press the go button!</p><p><div id='backFromBreak'><img src='http://artists.pixelovely.com/wordpress/wp-content/themes/drawing-child/images/tools/play.png'></div>");
			}
			jQuery("#controls").hide();
			jQuery("#backFromBreak").unbind();
			jQuery("#backFromBreak").click(function () { 
				obj.nextStep();
				jQuery("#controls").show();
			});
			
			jQuery("#drawme").fadeTo(300, 1.0);
			jQuery("#donate").fadeTo(300, 1.0);    
		  });
	}

	this.endClass = function () {
		jQuery("#controls").hide();
		jQuery("#drawme").fadeOut(300, function() {
			
			jQuery("#drawme").html("<h2>Class Dismissed</h2><p>Good job! You've completed a full training session. You are well on your way to improving your artistic skills.</p><p>Remember, if you really want to improve, make a point of practicing at least a little every day.</p><p><div id='endClass'><img src='http://artists.pixelovely.com/wordpress/wp-content/themes/drawing-child/images/tools/stop.png'></div></p>");	
			
			jQuery("#endClass").unbind();
			jQuery("#endClass").click(function () { 
				obj.raiseHouseLights();
			});
			
			jQuery("#drawme").fadeIn();  
			jQuery("#donate").fadeIn();  
		  });
	}

	
	this.displayImage = function(imagepath, creditline) {
		jQuery("#drawme").html("<img src='" + imagepath +"'><p>"+creditline+"</p>");
	}

	this.preLoadNextImage = function() {
		obj.advanceToCorrect();
		jQuery("#next").html("<img src='" + obj.getNextImage() +"'><p>"+obj.getNextCredit()+"</p>");
	}

	this.displayPreloadedImage = function() {
			var preloaded = jQuery("#next").html();
			jQuery("#drawme").fadeOut(300, function() {
				jQuery("#drawme").html(preloaded);
				obj.resizeWindow();
				jQuery("#drawme").fadeTo(300, 1.0, function() {
				 	
				});    
			  });
			lastImage = imagePointer;
			obj.preLoadNextImage();
		
		}
	
	this.activateClassMode = function() {
		mode = 'class';
	}
	
	this.activateStandardMode = function() {
		mode = 'standard';
	}
	
	this.shuffleImages = function() {
		  var i = pictures.length;
		  if ( i == 0 ) return false;
		  while ( --i ) {
		     var j = Math.floor( Math.random() * ( i + 1 ) );
		     var tempi = pictures[i];
		     var tempj = pictures[j];
		   	 pictures[i] = tempj;
		     pictures[j] = tempi;
		   }

		  obj.imagePointer= 0;
	}
	
	this.advanceToCorrect = function() {
		//Advance one
		imagePointer++;
		
		//If we've gone too far, reshuffle and go back to the beginning
		if (imagePointer > allimages-1) {
			obj.shuffleImages();
			imagePointer = 0;
		}
	}
	
	this.reverseToCorrect = function() {
		//Reverse one
		imagePointer--;
		
		//If we've gone too far, go to the first image in the set.
		if (imagePointer < 0) {
			imagePointer= 0;
			return;
		}
	}
	
	this.dimHouseLights = function () {
		jQuery("#activeScreen").fadeIn();
		jQuery("#black").fadeIn();
		jQuery("#controls").fadeIn();
		jQuery("#play").hide();
		jQuery("#pause").show();
		
	}

	this.raiseHouseLights = function () {
		jQuery("#activeScreen").fadeOut();
		jQuery("#black").fadeOut();
		jQuery("#controls").fadeOut();
		jQuery("#drawme").fadeOut();
		jQuery("#showTime").fadeOut();
	}
	
	this.restartTimerForThisSegment = function() {
		obj.stopTimer();
		obj.startTimer(timeInterval);
	}
	
	this.getNextCredit = function () {
		var creditkey = pictures[imagePointer][3];
		
		if (creditkey in credit) {
			var name = credit[creditkey][0];
			var link = credit[creditkey][1];
			var hide = credit[creditkey][2];
			
			if (!hide) {
				if (link == "") {
					var creditline = "Photo by "+name;
				} else {
					var creditline =  "Photo by <a href='"+link+"'>"+name+"</a>";
				}
			} else {
				var creditline =  "";
			}		
			return creditline;
		}
		return "";
	}
	
	this.getImageWidth = function() {
		return pictures[lastImage][1];
	}
	
	this.getImageHeight = function() {
		return pictures[lastImage][2];
	}

	this.getNextImage = function() {
		if (typeof(pictures[imagePointer]) != "undefined" && pictures[imagePointer] !== null) {
		
			return pictures[imagePointer][0];
		} else {
			alert(imagePointer);
		}
		
	}

	this.skipForward = function () {
		obj.displayPreloadedImage();
		obj.restartTimerForThisSegment();
		obj.showTime(timeInterval);
	}

	this.skipBackward = function () {	
		if (imagePointer > 0) {
			//If there's any further back to go, reverse
			obj.reverseToCorrect();
			//Start a counter
			var i = 0;
			//Make 3 attempts to go back one further, so the getNextImage function will give us the correct image path.
			while (lastImage == imagePointer && i < 4) {
				obj.reverseToCorrect();
				i++;
			}
			obj.restartTimerForThisSegment();
			var imagepath = obj.getNextImage();
			var creditline = obj.getNextCredit();
			obj.displayImage(imagepath,creditline);
			lastImage = imagePointer;
			obj.resizeWindow();
			jQuery("#drawme").fadeTo(300, 1.0);			
			obj.preLoadNextImage();
			obj.showTime(timeInterval);
		}
	}
	
	this.getTimingPreferences = function() {
		var selectedTime = jQuery('input[name=timer]:checked').val();
		var pattern = /^classMode/
		if(selectedTime.match(pattern)){
			obj.activateClassMode();
		}else{
			obj.activateStandardMode();
		}
	}
	
	this.startSession = function () {
		lastImage = 0;
		imagePointer = 0;
		obj.shuffleImages();
		obj.getTimingPreferences();
		obj.dimHouseLights();
		
		
		var selectedTime = jQuery('input[name=timer]:checked').val();
		var imagepath = obj.getNextImage();
		var creditline = obj.getNextCredit();
		obj.displayImage(imagepath,creditline);
		obj.resizeWindow();
		jQuery("#drawme").fadeIn();
		
		obj.preLoadNextImage();
		
		 if (mode == "standard") {	 
			 timeInterval = selectedTime;
		 } else {
			 classPointer = 0;
			 classSelection = selectedTime.substr(10, 1);
			 timeInterval = classes[classSelection][classPointer];
		 }
		 obj.startTimer(timeInterval);
		 obj.showTime(timeInterval);
	}
	
	this.nextStep = function () {
    window.clearInterval(window.clock);
    
		if (mode == "standard") {
			obj.displayPreloadedImage();
			obj.preLoadNextImage();
			obj.startTimer(timeInterval);
		} else if (mode == "class") {
			classPointer++;			
			if (classPointer > (classes[classSelection].length - 1)) {
				obj.endClass();
			} else if (classes[classSelection][classPointer] != "shortbreak" && classes[classSelection][classPointer] != "longbreak") {				
				obj.displayPreloadedImage();
				obj.preLoadNextImage();
				timeInterval = classes[classSelection][classPointer];
				obj.startTimer(timeInterval);

				obj.showTime(timeInterval);				
			} else if (classes[classSelection][classPointer] == "shortbreak" || classes[classSelection][classPointer] == "longbreak") {
				obj.takeBreak(classes[classSelection][classPointer]);
			} 
		}
	}
	
	this.resizeWindow = function() {
			//var newWindowHeight = jQuery(window).height() -50;
			//var newWindowWidth = jQuery(window).width() - 130;
			
			
			//This ugly calculation is intended as a workaround that takes into account safari mobile
			var newWindowHeight = window.innerHeight ? window.innerHeight : jQuery(window).height();
			newWindowHeight = newWindowHeight - 50; //Shave some extra off to make sure that credit is visible
			
			var newWindowWidth = window.innerWidth ? window.innerWidth: jQuery(window).width();
			newWindowWidth = newWindowWidth -130; //Shave some extra off to keep the toolbar visible
			
			var imageHeight = obj.getImageHeight();
			var imageWidth = obj.getImageWidth();
			//alert ("original image height: "+imageHeight+" original image width: "+imageWidth);
			//Prevent images from being bigger than screen
			jQuery("#drawme img").css("max-height", newWindowHeight);	
			jQuery("#drawme img").css("max-width", newWindowWidth);
			
			if (imageHeight != 0) {
				//Check to see if we can safely enlarge them
				//original height / original width x new width = new height
				while((imageHeight / imageWidth) * newWindowWidth > newWindowHeight ){
					newWindowWidth = newWindowWidth-20;
				 }
				
				jQuery("#drawme img").css("min-width", newWindowWidth);
			}
			
			//alert("Height:"+imageHeight+" Width:"+imageWidth);
			if ( jQuery.browser.msie ) {
				newWindowHeight = window.innerHeight ? window.innerHeight : jQuery(window).height();
				newWindowWidth = window.innerWidth ? window.innerWidth: jQuery(window).width();
				 if (imageWidth > (newWindowWidth - 130) || imageHeight > (newWindowHeight - 100)) {
					 if (imageWidth > imageHeight) {
						 jQuery("#drawme img").css("width", newWindowWidth-130 );
						 jQuery("#drawme img").css("height", "");
					 } else {
						 jQuery("#drawme img").css("height", newWindowHeight-100 );
						 jQuery("#drawme img").css("width", "");
					 }
				 } else {
					 jQuery("#drawme img").css("width", "");
					 jQuery("#drawme img").css("height", "");
				 }
			 }
	}
	
}

function is_array(input){
    return typeof(input)=='object'&&(input instanceof Array);
  }

function resizeWindow() {
	//var newWindowHeight = jQuery(window).height() -50;
	//var newWindowWidth = jQuery(window).width() - 130;
	
	
	//This ugly calculation is intended as a workaround that takes into account safari mobile
	var newWindowHeight = window.innerHeight ? window.innerHeight : jQuery(window).height();
	newWindowHeight = newWindowHeight - 50; //Shave some extra off to make sure that credit is visible
	
	var newWindowWidth = window.innerWidth ? window.innerWidth: jQuery(window).width();
	newWindowWidth = newWindowWidth -130; //Shave some extra off to keep the toolbar visible
	
	var imageHeight = jQuery("#drawme img").height();
	var imageWidth = jQuery("#drawme img").width();
	//alert ("original image height: "+imageHeight+" original image width: "+imageWidth);
	//Prevent images from being bigger than screen
	jQuery("#drawme img").css("max-height", newWindowHeight);	
	jQuery("#drawme img").css("max-width", newWindowWidth);
	
	if (imageHeight != 0) {
		//Check to see if we can safely enlarge them
		//original height / original width x new width = new height
		while((imageHeight / imageWidth) * newWindowWidth > newWindowHeight ){
			newWindowWidth = newWindowWidth-20;
		 }
		
		jQuery("#drawme img").css("min-width", newWindowWidth);
	}
	if ( jQuery.browser.msie ) {
		newWindowHeight = window.innerHeight ? window.innerHeight : jQuery(window).height();
		newWindowWidth = window.innerWidth ? window.innerWidth: jQuery(window).width();
		 if (imageWidth > (newWindowWidth - 130) || imageHeight > (newWindowHeight - 100)) {
			 if (imageWidth > imageHeight) {
				 jQuery("#drawme img").css("width", newWindowWidth-130 );
				 jQuery("#drawme img").css("height", "");
			 } else {
				 jQuery("#drawme img").css("height", newWindowHeight-100 );
				 jQuery("#drawme img").css("width", "");
			 }
		 } else {
			 jQuery("#drawme img").css("width", "");
			 jQuery("#drawme img").css("height", "");
		 }
	 }
}