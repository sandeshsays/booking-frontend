'use strict';

var bookingCalendarDirective = function () {

  var link = function (scope, element, attributes, controller) {

  	if (!scope.data) {

  		throw new Error('Calendar data can\'t be null!');

  	}

  	if (scope.data.timeInterval % 15 != 0) {
  		throw new Error('Time Interval must be divisible by 15');
  	}

  	controller.timeInterval = scope.data.timeInterval;

  };

  var directive = {};

  directive.restrict = 'E';
  directive.link = link;
  directive.templateUrl = 'components/booking-calendar/booking-calendar.html';
  directive.controller = 'BookingCalendarController';
  directive.scope = {
  	'data' : '='
  };

  return directive;

};

/**
* @ Booking Day Directive
*	0 = Sunday
* 1 = Monday, etc
*/
var bookingDayDirective = function () {

	var link = function (scope, element, attributes, controller) {

		switch(scope.day) {
			case 0: 
				scope.title = "Sunday";
				break;

			case 1: 
				scope.title = "Monday";
				break;

			case 2: 
				scope.title = "Tuesday";
				break;

			case 3: 
				scope.title = "Wednesday";
				break;

			case 4: 
				scope.title = "Thursday";
				break;

			case 5: 
				scope.title = "Friday";
				break;

			case 6: 
				scope.title = "Saturday";
				break;
		}

		scope.times = function () {

			var result = [];

			var bad = 1440 / controller.timeInterval;

			for (var i = 0; i < bad; i++) {
				result.push(i);
			}


			return result;

		};

	};

	var directive = {};

	directive.require = '^bookingCalendar';
	directive.restrict = 'E';
	directive.link = link;
	directive.templateUrl = 'components/booking-calendar/booking-day.html';
	directive.scope = {
		'day' : '='
	};

	return directive;

};

angular.module('booking')
  .directive('bookingCalendar', bookingCalendarDirective)
  .directive('bookingDay', bookingDayDirective);
