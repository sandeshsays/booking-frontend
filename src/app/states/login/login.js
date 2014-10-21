'use strict';

angular.module('booking.login', [
  'booking.parent-state'
  ])
.config(function ($stateProvider) {
  $stateProvider
    .state('app.login', {
      url: '/login',
      templateUrl: 'app/states/login/login.html'
    });
});