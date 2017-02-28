var pageLoad;//HACKy defining this globally but it basically a global vairable;

//Save the time the document loaded in the pageLoad variable
$(window).load(function () {
	$(document).ready(function () {
		pageLoad =  new Date();
	});
});

(function($) {

	$.fn.GAReadingTime = function( options ) {

		// Establish our default settings
		var settings = $.extend({
			eventCategory	 	: 'Content Viewing',
			eventStartAction 	: 'start',
			eventFinishAction	: 'finish',
			eventLabel		 	: null,
			targetStart			: this,
			targetFinish		: this,
			
		}, options);
		
		var startReading = null;
		var endReading = null;
		var timeToStart = null;
		var timeToRead = null;


			
		console.log('----------------- Plugin Start ----------------------');
		
		//Fire the readingTimesHandler when the plugin is first instantiated (NOTE: ideally should be after document.load)
		readingTimesHandler();
		
		//Fire the readingTimesHandler every time the DOM resizes or the user scrolls
		$(window).on('resize scroll', function(){
			readingTimesHandler();
		});
		 
			
		function readingTimesHandler(){
			/*
			 *Checks if the top or bottom of the target are in the viewport, calculates the timeToStart and timeToRead accordingly,
			 *and fires the GA event as appropriate
			*/
			
			if (timeToRead===null){
				
				//Calculate the positions of the target top and bottom and viewport top and bottoms
				var targetTop = $(settings.targetStart).offset().top;
				var targetBottom = $(settings.targetFinish).offset().top + $(settings.targetFinish).height();
				var viewportTop = $(window).scrollTop();
				var viewportBottom = $(window).scrollTop() + $(window).height();
				
				//If the top of the target is in the viewport for the first time, save the start reading time
				if (timeToStart === null && targetTop>=viewportTop && targetTop<=viewportBottom){
					startReading = new Date();
					timeToStart = Math.round((startReading - pageLoad) / 1000);//time in seconds
					ga('send', 'event', settings.eventCategory, settings.eventStartAction, settings.eventLabel, timeToStart);//HACK category, action, and label should be optional
				}
				
				//If the bottom of the target is in the viewport for the first time, calculate the time to read
				if (timeToRead === null && targetBottom>=viewportTop && targetBottom<=viewportBottom){
					endReading = new Date();
					timeToRead = Math.round((endReading - startReading) / 1000);//time in seconds
					ga('send', 'event', settings.eventCategory, settings.eventFinishAction, settings.eventLabel, timeToRead);//HACK category, action, and label should be optional
				}
			}
			
		}
		
		return this;
	};

}(jQuery));

//Tracks how the user is progressing through the article
//$(window).load(function () {
//    
//	var startedArticle = false;
//	var finishedArticle = false;
//	
//    $(document).ready(function () {
//		
//		var pageLoad = new Date();
//		var startReading;
//		var endReading;
//		var timeToStart = null;
//		var timeToRead = null;
//		
//		if (trackWaypoints === true){
//			//Send a google event when the user starts reading
//			var startReadingWaypoint = $('.article_title').waypoint(function(direction) {
//				if (direction=='down' && startedArticle===false){
//					startedArticle = true;
//					startReading = new Date();
//					timeToStart = Math.round((startReading - pageLoad) / 1000);//time in seconds
//					ga('send', 'event', 'Content Viewing', 'start', contentType, timeToStart);
//				}
//			});
//			
//			//Send and event when the user finishs reading
//			var endReadingWaypoint = $('.end-bar').waypoint(function(direction) {
//				if (direction=='down' && finishedArticle===false){
//					finishedArticle = true;
//					
//					if (startedArticle === true){
//						endReading = new Date();
//						timeToRead = Math.round((endReading - startReading) / 1000);//time in seconds
//					}
//					
//					ga('send', 'event', 'Content Viewing', 'finish', contentType, timeToRead);
//				}
//			},
//				{offset: function() {return Waypoint.viewportHeight() - this.element.clientHeight;}}
//			);
//		}
//		
//	});
//});


