'use strict';

var bookingCalendarController = function () {

  this.timeInterval = 30;

};

angular.module('booking')
  .controller('BookingCalendarController', bookingCalendarController);
