'use strict';

var viewCalendarController = function () {

  

};

angular.module('booking.calendar', [
		'booking.parent-state'
	])
	.config(function ($stateProvider) {
	  $stateProvider
      .state('app.calendar', {
        url: '/:slug/calendar/',
        templateUrl: 'app/states/calendar/calendar.html'
      });
	})
  .controller('ViewCalendarController', viewCalendarController);
