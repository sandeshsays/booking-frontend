'use strict';

var bookableCalendarDirective = function () {

  var link = function (scope, element, attributes, controller) {

  	scope.back = function () {



  	};

  	scope.forward = function () {



  	};

  };

  var directive = {};

  directive.restrict = 'E';
  directive.link = link;
  directive.templateUrl = 'components/bookable-calendar/bookable-calendar.html';
  directive.scope = {
  	'bookable' : '='
  };

  directive.controller = function () {

  };

  return directive;

};

/**
* @ Booking Day Directive
*	0 = Sunday
* 1 = Monday, etc
*/
var bookableDayDirective = function () {

	var MINIMUM_TIME_PERIOD = 30; // minutes

	var MINUTES_IN_DAY = 1440;

	var link = function (scope, element, attributes, controller) {

		switch(scope.day) {
			case 0: 
				scope.dayOfWeek = "Sunday";
				break;

			case 1: 
				scope.dayOfWeek = "Monday";
				break;

			case 2: 
				scope.dayOfWeek = "Tuesday";
				break;

			case 3: 
				scope.dayOfWeek = "Wednesday";
				break;

			case 4: 
				scope.dayOfWeek = "Thursday";
				break;

			case 5: 
				scope.dayOfWeek = "Friday";
				break;

			case 6: 
				scope.dayOfWeek = "Saturday";
				break;
		}

		var initialiseTimePeriods = function () {

			var numberOfTimePeriods = MINUTES_IN_DAY / MINIMUM_TIME_PERIOD;

			var timePeriods = [];

			// change to angular for
			for(var i = 0; i < numberOfTimePeriods; i++) {
				timePeriods.push({
					time: i * 30
				});
			}

			scope.timePeriods = timePeriods;

		};

		var initialiseWatchers = function () {

			element.on('mousedown', function (e) {

				var start = angular.element(e.target);
				console.log(angular.element(e.target));

				element.append('<div class="booking" style="position: absolute; top: 0; height: 24px;">hey lol</div>');

			});

		};

		var createBookingStub = function (target) {



		};

		initialiseTimePeriods();
		initialiseWatchers();

	};

	var directive = {};

	directive.require = '^bookableCalendar';
	directive.restrict = 'E';
	directive.link = link;
	directive.templateUrl = 'components/bookable-calendar/bookable-day.html';
	directive.scope = {
		'day' : '='
	};

	return directive;

};

angular.module('booking')
  .directive('bookableCalendar', bookableCalendarDirective)
  .directive('bookableDay', bookableDayDirective);
