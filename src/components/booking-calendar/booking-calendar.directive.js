'use strict';

var bookingCalendarDirective = function () {

  var link = function (scope, element, attributes) {

  };

  var directive = {};

  directive.restrict = 'E';
  directive.link = link;
  directive.templateUrl = 'components/booking-calendar/booking-calendar.html';
  directive.controller = 'BookingCalendarController';

  return directive;

};

angular.module('booking')
  .directive('bookingCalendar', bookingCalendarDirective);
