'use strict';

angular.module('booking.home', [
  'booking.parent-state'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.home', {
        url: '/',
        templateUrl: 'app/states/home/home.html',
        controller: 'HomeController'
      });
  })
  .controller('HomeController', function () {

  });
